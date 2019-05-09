import {PAYMENT_FAIL, PAYMENT_RECEIVED, PAYMENT_SENT} from "./paymentConstants";

export const classifyPayments = (paymentsList) =>{
    let paymentMatrix = {
        received : [],
        sent: [],
        failed: [],
        unknown: []
    };
    if(paymentsList && paymentsList.length >0){
        paymentsList.forEach((payment)=>{
            switch (payment.event) {
                case PAYMENT_RECEIVED:
                    paymentMatrix.received.push(payment);
                    break;
                case  PAYMENT_SENT:
                    paymentMatrix.sent.push(payment);
                    break;
                case  PAYMENT_FAIL:
                    paymentMatrix.failed.push(payment);
                    break;
                default:
                    paymentMatrix.unknown.push(payment);
                    break;
            }
        })
    }
    return paymentMatrix;
};