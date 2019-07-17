import React, { Component } from "react";
import {
  STATE_CLOSED,
  STATE_OPENED,
  STATE_WAITING
} from "../../lib/channels/channelsConstants";
import { CHANNEL } from "../../lib/search/searchConstants";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NumberFormat from "react-number-format";
import { fromWei } from "../../lib/amounts/weiConversion";

import { getTaskDetail } from "../../actions/actionUtils";
import Link from "react-router-dom/es/Link";
import Switch from "react-switch";
import InvoiceForm from "../../components/billing/InvoiceForm"

export default class ChannelItem extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      showPayment: false,
      showChannel: false,

      inputAmount: "",
      inputSettleTimeOut: 500,
      checked: false,
      coded_invoice: ""
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowPayment = this.handleShowPayment.bind(this);
    this.handleClosePayment = this.handleClosePayment.bind(this);
    this.handleModalShowChannel = this.handleModalShowChannel.bind(this);
    this.handleModalCloseChannel = this.handleModalCloseChannel.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeAmountPayment = this.handleChangeAmountPayment.bind(this);
    this.handleMakePayment = this.handleMakePayment.bind(this);
    this.handleCloseChannel = this.handleCloseChannel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValueInvoiceChange = this.handleValueInvoiceChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClosePayment() {
    this.setState({ showPayment: false });
  }

  handleShowPayment() {
    this.setState({ showPayment: true });
  }

  handleModalCloseChannel() {
    this.setState({ showChannel: false });
  }

  handleModalShowChannel() {
    this.setState({ showChannel: true });
  }

  handleChangeAmount(event) {
    this.setState({ inputAmount: event.value });
  }

  handleDeposit = () => {
    this.props.incrementTaskPending(
      getTaskDetail("deposit", {
        token: this.props.token,
        partner: this.props.partner
      })
    );
    this.props.depositChannel(
      this.props.token,
      this.props.partner,
      this.state.inputAmount,
      this.props.balance
    );
    this.handleClose();
  };

  handleChangeAmountPayment(event) {
    this.setState({ inputAmount: event.value });
  }

  handleValueInvoiceChange(event) {
    this.setState({ coded_invoice: event.currentTarget.value.trim() });
  }

  handleMakePayment() {
    this.props.incrementTaskPending(
      getTaskDetail("payment", {
        token: this.props.token,
        partner: this.props.partner
      })
    );
    this.props.payChannel(
      this.props.partner,
      this.props.token,
      this.state.inputAmount
    );
    this.handleClosePayment();
  }

  handleMakePaymentInvoice() {
    this.props.incrementTaskPending(
        getTaskDetail("paymentInvoice", {
          invoice: this.state.coded_invoice,
        })
    );
    this.props.payInvoiceChannel(
        this.state.coded_invoice
    );
    this.handleClosePayment();
  }

  handleCloseChannel() {
    this.props.incrementTaskPending(
      getTaskDetail("closeChannel", {
        token: this.props.token,
        partner: this.props.partner
      })
    );
    this.props.closeChannel(this.props.token, this.props.partner);
    this.handleModalCloseChannel();
  }

  render = () => {
    let badgeClass = "badge ml-1";
    let routeLink = "/channelDetail";
    let suggestion = {
      value: {
        id: this.props.id,
        networkId: this.props.networkId,
        partnerAddress: this.props.partner,
        tokenAddress: this.props.token,
        tokenName: this.props.tokenName
      },
      type: CHANNEL
    };

    let paymentForm = ( <div className="form-group">
      <NumberFormat
          value={this.state.inputAmount}
          className="form-control shadow-none"
          placeholder={"Amount"}
          onValueChange={e => this.handleChangeAmountPayment(e)}
      />
    </div>);

    let paymentSubmitButton = (<Button
        className="btn-pay border-0 btn-block py-3"
        variant="primary"
        onClick={() => this.handleMakePayment()}
    >
      PAY
    </Button>);

    if (this.state.checked){
      paymentForm = <InvoiceForm
          handleValueInvoiceChange={(value) => this.handleValueInvoiceChange(value)}
          value={this.state.coded_invoice}
          quickPayment={false}/>

      paymentSubmitButton = (<Button
          className="btn-pay border-0 btn-block py-3"
          variant="primary"
          onClick={() => this.handleMakePaymentInvoice()}
      >
        PAY
      </Button>)
    }

    switch (this.props.state) {
      case STATE_OPENED:
        badgeClass += " badge-success";
        break;
      case STATE_CLOSED:
        badgeClass += " badge-dark";
        break;
      case STATE_WAITING:
        badgeClass += " badge-warning";
        break;
      default:
        badgeClass += "";
        break;
    }

    return (
      <li className="col-12 my-4">
        <div className="card">
          <div className="card-body d-md-flex px-0 align-items-center py-4">
            <ul className="px-3 my-3 list-unstyled">
              <li>
                <b>ID:</b>{" "}
                <span className="text-blue ml-1">{this.props.id}</span>
              </li>
              <li>
                <b>Address:</b>{" "}
                <span className="text-blue ml-1">{this.props.partner}</span>
                {/*<Clipboard data-clipboard-text={this.props.partner} className="btn btn-copy-address text-green ml-1">*/}
                {/*<i className="fal fa-copy align-middle"></i>*/}
                {/*</Clipboard>*/}
              </li>
              <li>
                <b>Token Name:</b>{" "}
                <span className="text-blue ml-1">{this.props.tokenName}</span>
              </li>
              <li>
                <b>Token Address:</b>{" "}
                <span className="text-blue ml-1">{this.props.token}</span>
                {/*<Clipboard data-clipboard-text={this.props.token} className="btn btn-copy-address text-green ml-1">*/}
                {/*<i className="fal fa-copy align-middle"></i>*/}
                {/*</Clipboard>*/}
              </li>
              <li>
                <b>Balance:</b>{" "}
                <span className="text-blue ml-1">
                  {fromWei(this.props.balance, this.props.tokenDecimals)}
                </span>
              </li>
              <li>
                <b>Status:</b>{" "}
                <span className={badgeClass}>{this.props.state}</span>
              </li>
            </ul>
            <div className="ml-auto text-center px-3 pl-lg-0 mt-3 mt-md-0">
              <button
                className="btn py-lg-3 d-lg-block btn-pay text-white mb-md-3 mr-2 ml-md-0"
                onClick={this.handleShowPayment}
              >
                PAY!
              </button>
              <button
                className="btn btn-blue text-white mr-md-2 mr-2"
                onClick={this.handleShow}
              >
                Deposit
              </button>
              {/*<button className="btn btn btn-outline-dark ml-2" onClick={()=> this.props.closeChannel(this.props.token, this.props.partner)}>*/}
              <button
                className="btn btn btn-outline-dark ml-md-2 mr-md-0 mr-2"
                onClick={this.handleModalShowChannel}
              >
                Close
              </button>
              <Link
                className="btn d-lg-block shadow-none mt-md-3 btn-secondary btn-view-detail"
                to={routeLink}
                onClick={() => this.props.selectedSuggestion(suggestion)}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Deposit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <NumberFormat
                value={this.state.inputAmount}
                className="form-control shadow-none"
                placeholder={"Amount"}
                onValueChange={e => this.handleChangeAmount(e)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-pay border-0 btn-block py-3"
              variant="primary"
              onClick={() => this.handleDeposit()}
            >
              Deposit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showPayment}
          onHide={this.handleClosePayment}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
            <div className={"invoice-switch-left"}>
              <span>Invoice</span>
              <Switch className="switch-invoice" onChange={this.handleChange} checked={this.state.checked} />
            </div>
          </Modal.Header>
          <Modal.Body>
           {paymentForm}
          </Modal.Body>
          <Modal.Footer>

            {paymentSubmitButton}

          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showChannel}
          onHide={this.handleModalCloseChannel}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Close Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to close channel <b>{this.props.id}</b>{" "}
              with: <b>{this.props.partner}</b> on token:{" "}
              <b>{this.props.token}</b>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-close border-0 btn-block py-3"
              variant="primary"
              onClick={() => this.handleCloseChannel()}
            >
              CLOSE
            </Button>
          </Modal.Footer>
        </Modal>
      </li>
    );
  };
}


const PaymentForm = (props) => {
  return (
      <div className="form-group">
        <NumberFormat
            value={props.inputAmount}
            className="form-control shadow-none"
            placeholder={"Amount"}
            onValueChange={e => this.handleChangeAmountPayment(e)}
        />
      </div>
  );
}


