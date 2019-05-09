import React, {Component} from "react";

export default class LastPaymentInfo extends Component {
    render =()=> {
        let paymentSentQty = 0;
        let paymentReceivedQty = 0;
        let paymentWaitingQty = 0;
        let paymentFailedQty = 0;


        if (this.props.paymentInfo) {
            let myLastPayments = this.props.paymentInfo;

            for (let i = 0; i < myLastPayments.length ; i++) {
                switch (myLastPayments[i].event_type_code) {
                    case 1:
                        paymentReceivedQty = myLastPayments[i].quantity;
                        break;
                    case 2:
                        paymentFailedQty = myLastPayments[i].quantity;
                        break;
                    case 3:
                        paymentSentQty = myLastPayments[i].quantity;
                        break;
                    case 4:
                        paymentWaitingQty = myLastPayments[i].quantity;
                        break;
                    default:
                        console.log('More payments event types than expected')
                }
            }
        }

        return  <ul className="text-center list-unstyled last-movements mb-0 text-white px-3 pt-3 pb-2 rounded-left bg-secondary d-flex d-sm-inline-block justify-content-around">
            <li className="mb-sm-2 last-movements__received border-bottom">
                <i className="fal fa-long-arrow-left fa-lg"></i>
                <p className="m-0">
                    Payment <br/>
                    Received:
                    <span className="d-block">{paymentReceivedQty}</span>
                </p>
            </li>
            <li className="mb-sm-2 last-movements__sent border-bottom">
                <i className="fal fa-long-arrow-right fa-lg"></i>
                <p className="m-0">
                    Payment <br/>
                    Sent:
                    <span className="d-block">{paymentSentQty}</span>
                </p>
            </li>
            <li className="mb-sm-2 last-movements__pending border-bottom">
                <i className="fal fa-stopwatch fa-lg"></i>
                <p className="m-0">
                    Payment <br/>
                    Pending:
                    <span className="d-block">{paymentWaitingQty}</span>
                </p>
            </li>
            <li className="last-movements__failed">
                <i className="fal fa-exclamation-triangle fa-lg"></i>
                <p className="m-0">
                    Payment <br/>
                    Failed:
                    <span className="d-block">{paymentFailedQty}</span>
                </p>
            </li>
        </ul>
    }
}
