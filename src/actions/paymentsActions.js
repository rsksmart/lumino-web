import client from "../restClient/index";
import {
    GET_PAYMENTS,
    PAYMENT_SUCCEED,
    TASK_COMPLETE,
    TASK_FAILED
} from "./types";
import {
    addNonEmptyParams,
    decrementPendingTask,
    displayToast
} from "./actionUtils";
import _ from "lodash";
import { ALL_STATUSES } from "../constants/uiConstants";
import { toWei } from "../lib/amounts/weiConversion";
import { getDecimals } from "../lib/tokens/tokensLogic";
import {getTokenApp} from "./tokenAppActions";

export const getPayments = (
    initiator,
    target,
    fromDate,
    toDate,
    status,
    networkId
) => (dispatch, getState) =>
    new Promise((resolve, reject) => {
        let paramValuesList = [];
        let valueList = [];
        if (!_.isEmpty(initiator)) {
            // Address must be 0X prefixed and 42 length string
            if (initiator.startsWith("0x") && initiator.length === 42) {
                paramValuesList.push("initiator_address");
                valueList.push(initiator);
            }
        }
        if (!_.isEmpty(target)) {
            if (target.startsWith("0x") && target.length === 42) {
                paramValuesList.push("target_address");
                valueList.push(target);
            }
        }
        // Only query for status when is selected
        if (!_.isEmpty(status) && status !== ALL_STATUSES) {
            paramValuesList.push("event_type");
            valueList.push(status);
        }
        // Dates must be converted to ISO because the REST api expects that.
        if (fromDate) {
            paramValuesList.push("from_date");
            valueList.push(fromDate.toISOString());
        }
        if (toDate) {
            paramValuesList.push("to_date");
            valueList.push(toDate.toISOString());
        }

        if (!_.isEmpty(networkId)) {
            paramValuesList.push("token_network_identifier");
            valueList.push(networkId);
        }

        const params = addNonEmptyParams(paramValuesList, valueList);

        paymentsRequestResolver(params)
            .then(response => {
                return resolve(dispatch(getSuccess(response)));
            })
            .catch(error => {
                console.log(error);
            });
    });

const paymentsRequestResolver = async params => {
    try {
        const { event_type } = { ...params };
        if (event_type) {
            switch (event_type) {
                case "1":
                    return invertGet(params);
                case "2":
                    return doubleGet(params);
                case "3":
                    return simpleGet(params);
                default:
                    return doubleGet(params);
            }
        }
        // We need to request both sent and received payments
        return doubleGet(params);
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

const simpleGet = async params => {
    try {
        const res = await client.get(`/api/v1/paymentsLumino`, {
            params
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const invertGet = async params => {
    const { initiator_address, target_address } = { ...params };
    const newParams = { ...params };
    newParams.initiator_address = target_address;
    newParams.target_address = initiator_address;
    return simpleGet(newParams);
};

const doubleGet = async params => {
    try {
        if (!params.initiator_address && !params.target_address){
            return await simpleGet(params);
        } else {
            const res = await Promise.all([simpleGet(params), invertGet(params)]);
            return [...res[0], ...res[1]];
        }
    } catch (error) {
        console.log(error);
    }
};

export const quickPayment = (partnerAddress, tokenAddress, totalDeposit) => async (
    dispatch,
    getState
) => {
    await getTokenApp("quickPayment");
    new Promise((resolve, reject) =>
        client
            .post(`/api/v1/payments/` + tokenAddress + "/" + partnerAddress, {
                amount: toWei(
                    totalDeposit,
                    getDecimals(tokenAddress, getState().tokenReducer.tokens)
                )
            })
            .then(response => {                
                displayToast(response, "payment");
                return resolve(
                    Promise.all([
                        dispatch(decrementPendingTask(TASK_COMPLETE)),
                        dispatch(paymentSuccess(response.data))
                    ])
                );
            })
            .catch(error => {
                console.log(JSON.stringify(error));
                displayToast(error.response, null);
                return resolve(dispatch(decrementPendingTask(TASK_FAILED)));
            })
    );
}


export const invoicePayment = (invoice) => async (dispatch,
    getState) => {
    try {
        await getTokenApp("invoicePayment");
        const response = await client.post(`/api/v1/payments/invoice`, {
            coded_invoice: invoice
        });
        displayToast(response, "invoice");
        await Promise.all([
            dispatch(decrementPendingTask(TASK_COMPLETE)),
            dispatch(paymentSuccess(response.data))
        ]);
    } catch(error) {
        console.log(JSON.stringify(error));
        displayToast(error.response, null);
        dispatch(decrementPendingTask(TASK_FAILED));
    }
}


const getSuccess = payments => ({
    type: GET_PAYMENTS,
    data: { payments: payments }
});

const paymentSuccess = payments => ({
    type: PAYMENT_SUCCEED,
    data: { payments: payments }
});
