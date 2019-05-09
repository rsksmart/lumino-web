import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

class NodeDetailContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputToken: "",
      inputAmount: "",
      inputSettleTimeOut: 500,
      tokensSuggestions: []
    };

    this.handleChangeToken = this.handleChangeToken.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
  }

  handleChangeToken(event) {
    this.setState({ inputToken: event.target.value });
  }

  handleChangeAmount(event) {
    this.setState({ inputAmount: event.target.value });
  }

  handleOpenChannel = () => {
    this.props.putChannel(
      this.state.inputAddress,
      this.state.inputToken,
      this.state.inputAmount,
      this.state.inputSettleTimeOut
    );
    this.handleClose();
  };

  render = () => {
    return (
      <div className="container-fluid p-5">
        <div className="row align-items-end">
          <div className="col">
            <div className="form-group">
              <label htmlFor="">Partner Address</label>
              <input
                type="text"
                className="form-control form-control-lg shadow-none"
                readOnly
                id=""
                aria-describedby=""
                placeholder="Amount:"
                value={this.props.suggestion.value}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group custom-suggestion-container">
              <label htmlFor="">Token Address</label>
              <input
                type="text"
                className="form-control form-control-lg shadow-none"
                id=""
                aria-describedby=""
                placeholder=""
                value={this.state.inputToken}
                onChange={this.handleChangeToken}
              />
            </div>
          </div>
          <div className="col-auto">
            <div className="form-group">
              <label htmlFor="">Amount</label>
              <input
                type="text"
                className="form-control form-control-lg shadow-none"
                id=""
                aria-describedby=""
                placeholder=""
                value={this.state.inputAmount}
                onChange={this.handleChangeAmount}
              />
            </div>
          </div>
          <div className="col-auto">
            <div className="form-group">
              <Button
                className="btn-pay border-0 btn-block btn-lg"
                variant="primary"
                onClick={this.handleOpenChannel}
              >
                Create Channel{" "}
                <i className="fal fa-chart-network fa-lg ml-2 pl-2 border-left align-middle" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    suggestion: state.searchReducer.suggestion
  };
};

export default connect(mapStateToProps)(NodeDetailContainer);
