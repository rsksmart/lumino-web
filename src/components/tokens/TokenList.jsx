import React, { Component } from "react";
import TokenItem from "./TokenItem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NumberFormat from "react-number-format";
import { getTaskDetail } from "../../actions/actionUtils";

export default class TokenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinNetworkOpened: false,
      leaveNetworkOpened: false,
      selectedToken: "",
      fundsInput: ""
    };
  }

  openLeaveModal = selectedToken => {
    this.setState({ selectedToken: selectedToken, leaveNetworkOpened: true });
  };

  closeLeaveModal = () => {
    this.setState({ selectedToken: "", leaveNetworkOpened: false });
  };

  onLeaveConfirm = () => {
    this.props.incrementTaskPending(
      getTaskDetail("leaveNetwork", {
        token: this.state.selectedToken,
        funds: this.state.fundsInput
      })
    );
    this.props.leaveNetworkHandler(this.state.selectedToken);
    this.closeLeaveModal();
  };

  openJoinModal = selectedToken => {
    this.setState({ selectedToken: selectedToken, joinNetworkOpened: true });
  };

  closeJoinModal = () => {
    this.setState({ selectedToken: "", joinNetworkOpened: false });
  };

  onJoinConfirm = () => {
    this.props.incrementTaskPending(
      getTaskDetail("joinNetwork", {
        token: this.state.selectedToken,
        funds: this.state.fundsInput
      })
    );
    this.props.joinNetworkHandler(
      this.state.selectedToken,
      this.state.fundsInput
    );
    this.closeJoinModal();
  };

  handleChangeFunds = event => {
    this.setState({ fundsInput: event.value });
  };

  render = () => {
    let tokenItemList = this.props.tokenList.map(e => {
      return (
        <TokenItem
          name={e.name}
          key={e.address}
          symbol={e.symbol}
          balance={e.balance / Math.pow(10, e.decimals)}
          address={e.address}
          joineable={e.joineable}
          unitPrice={e.unitPrice}
          unitPriceCurrency={e.unitPriceCurrency}
          totalWithCurrency={e.totalWithCurrency}
          dayAgoPercentageVariationPrice={e.dayAgoPercentageVariationPrice}
          openLeaveNetworkModal={this.openLeaveModal}
          openJoinNetworkModal={this.openJoinModal}
        />
      );
    });

    return (
      <div>
        <ul className="list-unstyled row token-list">{tokenItemList}</ul>
        <Modal
          show={this.state.leaveNetworkOpened}
          onHide={this.closeLeaveModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Leave Network</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to leave this network?{" "}
              <b>{this.state.selectedToken}</b>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-close border-0 btn-block py-3"
              variant="primary"
              onClick={async () => await this.onLeaveConfirm()}
            >
              LEAVE
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.joinNetworkOpened}
          onHide={this.closeJoinModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Join Token Network</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <NumberFormat
                value={this.state.fundsInput}
                className="form-control shadow-none"
                placeholder={"Funds"}
                onValueChange={e => this.handleChangeFunds(e)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-pay border-0 btn-block py-3"
              variant="primary"
              onClick={() => this.onJoinConfirm()}
            >
              JOIN
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
}
