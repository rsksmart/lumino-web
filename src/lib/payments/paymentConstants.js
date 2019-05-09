export const PAYMENT_RECEIVED = "EventPaymentReceivedSuccess";
export const PAYMENT_SENT = "EventPaymentSentSuccess";
export const PAYMENT_FAIL = "EventPaymentSentFailed";

export const  paymentEventToLabel = (eventType) => {
    switch (eventType) {
        case PAYMENT_RECEIVED:
            return "Received";
        case PAYMENT_SENT:
            return "Sent";
        case PAYMENT_FAIL:
            return "Failed";
        default:
            return ""
    }
}
