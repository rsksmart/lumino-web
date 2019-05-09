import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { mapSuggestions } from "../../actions/actionUtils";
import {
  onChange,
  onSuggestionsClearRequested,
  onSuggestionsFetchRequested
} from "../../actions/searchActions";
import SearchSuggestion from "../../components/search/SearchSuggestion";
import { quickPayment } from "../../actions/paymentsActions";
import { getName } from "../../lib/tokens/tokensLogic";
import { TOKEN } from "../../lib/search/searchConstants";
import client from "../../restClient";

class QuickPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerSuggestions: [],
      tokensSuggestions: [],
      inputAddress: "",
      inputToken: "",
      inputAmount: ""
    };
  }

  handleChangeAddress = (event, { newValue }) => {
    this.setState({
      inputAddress: typeof newValue !== "undefined" ? newValue : ""
    });
  };

  onPartnerSelected = (event, { suggestion }) => {
    this.setState({ inputAddress: suggestion.value });
  };

  onPartnerSuggestionsClearRequested = () => {
    this.setState({
      partnerSuggestions: []
    });
  };

  onTokenSelected = (event, { suggestion }) => {
    this.setState({ inputToken: suggestion.value });
  };

  onTokenSuggestionsClearRequested = () => {
    this.setState({
      tokensSuggestions: []
    });
  };

  handleChangeToken = (event, { newValue }) => {
    this.setState({
      inputToken: typeof newValue !== "undefined" ? newValue : ""
    });
  };

  handleChangeAmount = event => {
    this.setState({ inputAmount: event.target.value });
  };

  fetchPaymentSuggestions = async value => {
    try {
      const params = {
        query: value,
        only_receivers: true
      };
      const res = await client.get("/api/v1/searchLumino", {
        params
      });
      if (res) {
        const partnerSuggestions = mapSuggestions(res.data);
        return this.setState({ partnerSuggestions });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getTokensSuggestions = value => {
    if (value != null && value !== "") {
      let suggestions = [];
      const { tokens } = { ...this.props };
      if (tokens && tokens.length > 0) {
        tokens.forEach(tk => {
          if (tk.address.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({
              value: tk.address,
              type: TOKEN,
              label: `${getName(tk.address, tokens)} - ${tk.address}`
            });
          }
        });
      }
      this.setState({ tokensSuggestions: suggestions });
    }
  };

  handleClose = () => {
    this.props.handleClose();
  };

  handleQuickPayments = () => {
    const { quickPayment } = { ...this.props };
    const { inputAddress, inputToken, inputAmount } = { ...this.state };
    quickPayment(inputAddress, inputToken, inputAmount);
    this.handleClose();
  };

  render = () => {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <SearchSuggestion
              placeholder={"Partner address"}
              suggestions={this.state.partnerSuggestions}
              value={this.state.inputAddress}
              onSuggestionsFetchRequested={this.fetchPaymentSuggestions}
              onSuggestionsClearRequested={
                this.onPartnerSuggestionsClearRequested
              }
              onChange={this.handleChangeAddress}
              onSuggestionSelected={this.onPartnerSelected}
            />
          </div>
          <div className="form-group">
            <SearchSuggestion
              placeholder={"Token address"}
              suggestions={this.state.tokensSuggestions}
              value={this.state.inputToken}
              onSuggestionsFetchRequested={this.getTokensSuggestions}
              onSuggestionsClearRequested={
                this.onTokenSuggestionsClearRequested
              }
              onChange={this.handleChangeToken}
              onSuggestionSelected={this.onTokenSelected}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control shadow-none"
              id=""
              aria-describedby=""
              placeholder="Amount:"
              value={this.state.inputAmount}
              onChange={this.handleChangeAmount}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-pay border-0 btn-block py-3"
            variant="primary"
            onClick={this.handleQuickPayments}
          >
            PAY
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

const mapStateToProps = state => {
  return {
    searchResults: state.searchReducer.results,
    value: state.searchReducer.value,
    suggestions: state.searchReducer.suggestions,
    tokens: state.dashboardReducer.tokens
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    quickPayment: quickPayment,
    onChange: onChange,
    onSuggestionsFetchRequested: onSuggestionsFetchRequested,
    onSuggestionsClearRequested: onSuggestionsClearRequested
  };

  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickPayment);
