import React, { Component } from "react";
import client from "../../restClient/index";
import { mapSuggestions } from "../../actions/actionUtils";
import { bindActionCreators } from "redux";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { TOKEN } from "../../lib/search/searchConstants";
import NumberFormat from "react-number-format";
import { incrementTaskPending } from "../../actions/taskActions";
import { putChannel } from "../../actions/channelsActions";
import { getName } from "../../lib/tokens/tokensLogic";
import SearchSuggestion from "../../components/search/SearchSuggestion";
import { getTaskDetail } from "../../actions/actionUtils";

class AddChannelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      partnerSuggestions: [],
      tokensSuggestions: [],
      inputAddress: "",
      inputAmount: "",
      inputToken: ""
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleChangeAddress = event => {
    this.setState({ inputAddress: event.target.value });
  };

  handleChangeToken = event => {
    this.setState({ inputToken: event.target.value });
  };

  handleChangeAmount = event => {
    this.setState({ inputAmount: event.value });
  };

  onPartnerSuggestionsClearRequested = () => {
    this.setState({
      partnerSuggestions: []
    });
  };

  onTokenSuggestionsClearRequested = () => {
    this.setState({
      tokensSuggestions: []
    });
  };

  onPartnerSelected = (event, { suggestion }) => {
    this.setState({ inputAddress: suggestion.value });
  };

  onTokenSelected = (event, { suggestion }) => {
    this.setState({ inputToken: suggestion.value });
  };

  fetchPaymentSuggestions = async value => {
    try {
      const res = await client.get("/api/v1/searchLumino", {
        params: {
          query: value,
          only_receivers: true
        }
      });
      if (res) {
        let mappedResponse = mapSuggestions(res.data);
        this.setState({ partnerSuggestions: mappedResponse });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getTokensSuggestions = value => {
    if (value != null && value !== "") {
      const { tokens } = { ...this.props };
      let suggestions = [];
      if (tokens && tokens.length > 0) {
        tokens.forEach((tk, i) => {
          if (tk.address.toLowerCase().includes(value.toLowerCase())) {
            suggestions.push({
              value: tk.address,
              type: TOKEN,
              label: `${getName(tk.address, tokens)} - ${tokens[i].address}`
            });
          }
        });
      }
      this.setState({ tokensSuggestions: suggestions });
    }
  };

  handleOpenChannel = () => {
    const { partner } = { ...this.props };
    this.props.incrementTaskPending(getTaskDetail("openChannel", this.state));
    this.props.putChannel(
        partner ? partner : this.state.inputAddress,
        this.state.inputToken,
        this.state.inputAmount,
        this.state.inputSettleTimeOut
    );
    return this.props.handleClose();
  };

  render() {
    const { partner } = { ...this.props };
    return (
        <Modal show={this.props.show} onHide={this.props.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create New Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <SearchSuggestion
                  placeholder={"Partner address"}
                  suggestions={this.state.partnerSuggestions}
                  value={partner ? partner : this.state.inputAddress}
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
              <NumberFormat
                  value={this.state.inputAmount}
                  className="form-control shadow-none"
                  placeholder={"Amount"}
                  onValueChange={this.handleChangeAmount}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
                className="btn-pay border-0 btn-block py-3"
                variant="primary"
                onClick={this.handleOpenChannel}
            >
              Create
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    tokens: state.tokenReducer.tokens
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    putChannel: putChannel,
    incrementTaskPending: incrementTaskPending
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddChannelModal);
