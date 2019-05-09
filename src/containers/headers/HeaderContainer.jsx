import React, { Component } from "react";
import { ReactComponent as Logo } from "./logo-rif.svg";
import { Modal } from "react-bootstrap";
import SearchSuggestion from "../../components/search/SearchSuggestion";
import {
  onChange,
  selectedSuggestion,
  onSuggestionsClearRequested,
  onSuggestionsFetchRequested,
  loadSuggestionsBegin
} from "../../actions/searchActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { displayErrorToast } from "../../actions/actionUtils";
import RNS, { ADDRESS_ZERO } from "../../lib/rns/rns";
import { tableColumns } from "../../apiModels/tableModelTasks";
import TasksTable from "../../components/tables/TasksTable";
import { USER_ADDRESS } from "../../config/applicationConstants";
import QuickPayment from "../payments/QuickPayment";
import Clipboard from "react-clipboard.js";

class HeaderContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      nodeAddress: undefined,
      show: false,
      showPendingTasks: false
    };
  }

  async componentDidMount() {
    let addr = "";
    if (RNS.getRnsDomainValue()) {
      try {
        const rnsResolver = RNS.getRnsResolver();
        addr = await rnsResolver.addr(RNS.getRnsDomainValue());
        if (addr === ADDRESS_ZERO) {
          // Fallback for when is not registered
          addr = USER_ADDRESS;
          let message = {
            title: "RNS error",
            body:
              "Domain name " +
              RNS.getRnsDomainValue() +
              " is not registered in RNS"
          };
          displayErrorToast(message);
        }
      } catch (e) {
        //Fallback for errors (no rns for example)
        addr = USER_ADDRESS;
        let message = {
          title: "RNS error",
          body: "There is no RNS public resolver available"
        };
        displayErrorToast(message);
      }
    } else {
      addr = USER_ADDRESS;
    }
    this.setState({ nodeAddress: addr });
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClosePendingTasks = () => {
    this.setState({ showPendingTasks: false });
  };

  handleShowPendingTasks = () => {
    this.setState({ showPendingTasks: true });
  };

  render = () => {
    let tableTasks = null;
    if (this.props.tasks) {
      tableTasks = (
        <TasksTable
          data={this.props.tasks}
          columns={tableColumns}
          defaultPageSize={5}
          showPagination={false}
          sortable={false}
        />
      );
    }
    const RNSDomain = RNS.getRnsDomainValue();
    return (
      <header className="shadow-sm position-fixed w-100">
        <nav className="navbar navbar-expand-lg navbar-light bg-white p-0">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#side-bar"
            aria-controls="side-bar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <a className="navbar-brand mx-auto ml-lg-3 mr-lg-0 py-2 py-lg-0" href="/">
            <Logo />
          </a>
          <ul className="navbar-nav ml-lg-4 pl-lg-4 border-left nav-address-container">
            <li className="address-header">
              <span className="name text-green w-600 d-block d-sm-inline-block d-lg-block">
                {RNSDomain}
                {RNSDomain && <Clipboard
                    data-clipboard-text={RNSDomain}
                    className="btn btn-copy-address text-green m-1"
                > <i className="fal fa-copy align-middle" />
                </Clipboard>}

              </span>
              <small className="ml-sm-3 ml-lg-0 address d-block d-sm-inline-block d-lg-block">
                {this.state.nodeAddress}
                <Clipboard
                  data-clipboard-text={this.state.nodeAddress}
                  className="btn btn-copy-address text-green m-1"
                >
                  <i className="fal fa-copy align-middle" />
                </Clipboard>
              </small>
            </li>
          </ul>

          <ul className="navbar-nav mx-auto ml-lg-auto mr-lg-0 flex-row align-items-center px-2 px-sm-0">
            <li className="nav-item">
              <SearchSuggestion
                placeholder={"Search..."}
                selectedSuggestion={this.props.selectedSuggestion}
                redirect={true}
                suggestions={this.props.suggestions}
                value={this.props.value}
                isLoading={this.props.isLoading}
                noSuggestions={this.props.noSuggestions}
                onSuggestionsClearRequested={
                  this.props.onSuggestionsClearRequested
                }
                onSuggestionsFetchRequested={
                  this.props.onSuggestionsFetchRequested
                }
                onChange={this.props.onChange}
                loadSuggestionsBegin={this.props.loadSuggestionsBegin}
              />
            </li>
            <li className="nav-item">
              <button
                type="button"
                name="button"
                className="nav-link btn-search px-3"
              >
                <i className="fal fa-search" />
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                name="button"
                className="nav-link border-0 bg-transparent px-3 text-green"
                onClick={this.handleShow}
              >
                <i className="fal fa-money-bill" />
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                name="button"
                className="nav-link border-0 bg-transparent px-3 text-blue position-relative btn-bell"
                onClick={this.handleShowPendingTasks}
              >
                <i className="fal fa-bell" />{" "}
                <span className="badge badge-dark position-absolute">
                  {" "}
                  {this.props.tasksCount}{" "}
                </span>
              </button>
            </li>
          </ul>
        </nav>

        <Modal
          show={this.state.showPendingTasks}
          onHide={this.handleClosePendingTasks}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Pending Tasks</Modal.Title>
          </Modal.Header>
          <Modal.Body>{tableTasks}</Modal.Body>
          <Modal.Footer />
        </Modal>
        <QuickPayment show={this.state.show} handleClose={this.handleClose} title={"Quick Payment"} />
      </header>
    );
  };
}

const mapStateToProps = state => {
  return {
    channels: state.channelReducer.channels,
    channelsChanged: state.channelReducer.channelsChanged,
    searchResults: state.searchReducer.results,
    value: state.searchReducer.value,
    suggestions: state.searchReducer.suggestions,
    isLoading: state.searchReducer.isLoading,
    noSuggestions: state.searchReducer.noSuggestions,
    tasksCount: state.taskStatusReducer.count,
    tasks: state.taskStatusReducer.tasks
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    onChange: onChange,
    onSuggestionsFetchRequested: onSuggestionsFetchRequested,
    onSuggestionsClearRequested: onSuggestionsClearRequested,
    loadSuggestionsBegin: loadSuggestionsBegin,
    selectedSuggestion: selectedSuggestion
  };

  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
