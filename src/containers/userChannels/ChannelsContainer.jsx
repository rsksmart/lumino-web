import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  closeChannel,
  depositChannel,
  pollChannels,
  putChannel
} from "../../actions/channelsActions";
import PollingContainer from "../../genericContainers/PollingContainer";
import "react-toastify/dist/ReactToastify.css";
import { quickPayment, invoicePayment } from "../../actions/paymentsActions";
import ChannelList from "../../components/channels/ChannelList";
import FiltersChannels from "../../components/filtersChannels/FiltersChannels";
import {
  attributeToType,
  SORT_ASC,
  SORT_BY_NAME,
  SORT_DESC
} from "../../constants/uiConstants";
import { andLikeFilter } from "../../lib/filter/filters";
import { basicSort } from "../../lib/sort/basicSorting";
import { pollTokens } from "../../actions/tokensActions";
import { incrementTaskPending } from "../../actions/taskActions";
import { selectedSuggestion } from "../../actions/searchActions";
import QuickPayment from "../payments/QuickPayment";
import AddChannelModal from "./AddChannelModal";
class ChannelsContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      showQuickPayment: false,
      inputAddress: "",
      inputToken: "",
      inputAmount: "",
      inputSettleTimeOut: 500,
      inputAmountPayment: "",
      filterTokenName: undefined,
      filterPartnerAddress: undefined,
      sortBy: SORT_BY_NAME,
      partnerSuggestions: [],
      tokensSuggestions: []
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleCloseChannel = (tokenAddress, partnerAddress) => {
    this.props.closeChannel(tokenAddress, partnerAddress);
  };

  handleDepositChannel = (
      tokenAddress,
      partnerAddress,
      totalDeposit
  ) => {
    this.props.depositChannel(
        tokenAddress,
        partnerAddress,
        totalDeposit
    );
  };

  handleQuickPayments = (partnerAddress, tokenAddress, totalDeposit) => {
    this.props.quickPayment(partnerAddress, tokenAddress, totalDeposit);
  };

  handleInvoicePayment = (invoice) => {
    this.props.invoicePayment(invoice)
  }

  handleOpenQuickPayment = () => {
    this.setState({ showQuickPayment: true });
  };

  handleCloseQuickPayment = () => {
    this.setState({ showQuickPayment: false });
  };

  handleFilterTokenNameChange = event =>
      this.setState({ filterTokenName: event.target.value });

  handleFilterPartnerAddressChange = event =>
      this.setState({ filterPartnerAddress: event.target.value });

  handleSortByChange = event => this.setState({ sortBy: event.target.value });

  filterChannels = () => {
    if (
        this.props.channels &&
        this.props.channels.length > 0 &&
        (this.state.filterTokenName || this.state.filterPartnerAddress)
    ) {
      return andLikeFilter(
          this.props.channels,
          "token_address",
          "partner_address",
          this.state.filterTokenName,
          this.state.filterPartnerAddress
      );
    } else {
      return this.props.channels;
    }
  };

  applyFiltersAndSorting = () => {
    let filteredChannels = this.filterChannels();
    const attType = attributeToType[this.state.sortBy];
    if (filteredChannels) {
      if (attType === String) {
        return basicSort(
            filteredChannels,
            this.state.sortBy,
            attributeToType[this.state.sortBy],
            SORT_ASC
        );
      } else {
        return basicSort(
            filteredChannels,
            this.state.sortBy,
            attributeToType[this.state.sortBy],
            SORT_DESC
        );
      }
    }
  };

  getData = () => {
    this.props.pollChannels();
    this.props.pollTokens();
  };

  render = () => {
    return (
        <div>
          <div className="py-2 px-2 px-md-5 filters-bar">
            <FiltersChannels
                onTokenFilterChange={this.handleFilterTokenNameChange}
                onPartnerFilterChange={this.handleFilterPartnerAddressChange}
                onSortByChange={this.handleSortByChange}
            />
          </div>
          <PollingContainer
              render={this.renderPolling}
              pollAction={this.props.pollChannels}
              dueTim={0}
              periodOfScheduler={2000}
          />
          <PollingContainer
              render={()=>{return null}}
              pollAction={this.props.pollTokens}
              dueTim={0}
              periodOfScheduler={30000}
          />
          <div className="container-fluid px-3 px-md-5">
            <div className="row my-3">
              <div className="col-sm col-md-auto text-center ml-md-auto mb-2 mb-sm-0">
                <button
                    type="button"
                    name="button"
                    className="btn btn-lg btn-green"
                    onClick={this.handleShow}
                >
                  New Channel{" "}
                  <i className="fal fa-chart-network fa-lg ml-2 pl-2 border-left align-middle" />
                </button>
              </div>
              <div className="col-sm col-md-auto text-center">
                <button
                    type="button"
                    name="button"
                    className="btn btn-lg btn-green"
                    onClick={this.handleOpenQuickPayment}
                >
                  Send Tokens
                  <i className="fal fa-money-bill-alt fa-lg ml-2 pl-2 border-left align-middle" />
                </button>
              </div>
            </div>
          </div>
          <div className="container-fluid px-3 px-md-5">
            <ChannelList
                incrementTaskPending={this.props.incrementTaskPending}
                channelList={this.applyFiltersAndSorting()}
                closeChannel={(a, b) => this.handleCloseChannel(a, b)}
                depositChannel={this.handleDepositChannel}
                payChannel={(a, b, c) => this.handleQuickPayments(a, b, c)}
                payInvoiceChannel={(invoice) => this.handleInvoicePayment(invoice)}
                tokens={this.props.tokens}
                selectedSuggestion={this.props.selectedSuggestion}
            />
          </div>
          <QuickPayment
              show={this.state.showQuickPayment}
              handleClose={this.handleCloseQuickPayment}
              title={"Send Tokens"}
              incrementTaskPending={this.props.incrementTaskPending}
              invoicePayment={this.props.invoicePayment}
          />
          <AddChannelModal
              handleClose={this.handleClose}
              show={this.state.show}
          />
        </div>
    );
  };

  renderPolling = () => {
    return null; // Maybe in a future we can add a toast or something
  };
}

const mapStateToProps = state => {
  return {
    channels: state.channelReducer.channels,
    channelsChanged: state.channelReducer.channelsChanged,
    tokens: state.tokenReducer.tokens
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    pollChannels: pollChannels,
    putChannel: putChannel,
    incrementTaskPending: incrementTaskPending,
    closeChannel: closeChannel,
    depositChannel: depositChannel,
    quickPayment: quickPayment,
    invoicePayment: invoicePayment,
    pollTokens: pollTokens,
    selectedSuggestion: selectedSuggestion
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelsContainer);
