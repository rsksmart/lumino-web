import client from "../restClient";
import { POLL_CHANNELS, TASK_COMPLETE, TASK_FAILED } from "./types";
import { toWei } from "../lib/amounts/weiConversion";
import { getDecimals } from "../lib/tokens/tokensLogic";
import { decrementPendingTask, displayToast } from "./actionUtils";
import {getTokenApp} from "./tokenAppActions";

export const pollChannels = () => (dispatch, getState) =>
    new Promise((resolve, reject) =>
        client
            .get(`/api/v1/channels`)
            .then(response => {
                return resolve(
                    dispatch(
                        pollSucceed(
                            response.data,
                            checkChannelsChanged(
                                getState().channelReducer.channels,
                                response.data
                            )
                        )
                    )
                );
            })
            .catch(error => {
                console.log(JSON.stringify(error));
            })
    );

export const putChannel = (
    partnerAddress,
    tokenAddress,
    totalDeposit,
    settleTimeOut
)  => async (dispatch, getState) => {
    await getTokenApp("putChannel");
    const total_deposit = toWei(
        totalDeposit,
        getDecimals(tokenAddress, getState().tokenReducer.tokens)
    );
    new Promise((resolve, reject) =>
        client
            .put(`/api/v1/channels`, {
                partner_address: partnerAddress,
                token_address: tokenAddress,
                total_deposit,
                settle_timeout: settleTimeOut
            })
            .then(response => {
                if (total_deposit > 0) {
                    displayToast(response, "balance_update");
                }
                return resolve(dispatch(decrementPendingTask(TASK_COMPLETE)));
            })
            .catch(error => {
                console.log(JSON.stringify(error));
                displayToast(error.response, null);
                return resolve(dispatch(decrementPendingTask(TASK_FAILED)));
            })
    );
};

export const closeChannel = (tokenAddress, partnerAddress) => async (
    dispatch,
    getState) =>  {
    await getTokenApp("closeChannel");
    new Promise((resolve, reject) =>
        client
            .patch(`/api/v1/channels/` + tokenAddress + "/" + partnerAddress, {
                state: "closed"
            })
            .then(response => {
                displayToast(response, "close_channel");
                return resolve(dispatch(decrementPendingTask(TASK_COMPLETE)));
            })
            .catch(error => {
                console.log(JSON.stringify(error));
                displayToast(error.response, null);
                return resolve(dispatch(decrementPendingTask(TASK_FAILED)));
            })
    );
};

export const depositChannel = (
    tokenAddress,
    partnerAddress,
    totalDeposit
) => async (dispatch, getState) => {
    await getTokenApp("depositChannel");
    let channel_deposit = 0;
    await client
    .get(`/api/v1/channels/${tokenAddress}/${partnerAddress}`)
    .then(response => {
      channel_deposit = response.data.total_deposit;
    })
    .catch(error => {
        displayToast(error.response, null);
    })
    new Promise((resolve, reject) =>
        client
            .patch(`/api/v1/channels/${tokenAddress}/${partnerAddress}`, {
                total_deposit:
                    Number(
                        toWei(
                            totalDeposit,
                            getDecimals(tokenAddress, getState().tokenReducer.tokens)
                        )
                    ) + Number(channel_deposit)
            })
            .then(response => {
                displayToast(response, "deposit_channel");
                return resolve(dispatch(decrementPendingTask(TASK_COMPLETE)));
            })
            .catch(error => {
                displayToast(error.response, null);
                return resolve(dispatch(decrementPendingTask(TASK_FAILED)));
            })
    );
};

const pollSucceed = (channels, dataChanged) => ({
    type: POLL_CHANNELS,
    data: { channels: channels, channelsChanged: dataChanged }
});

const checkChannelsChanged = (prevStateChannels, newStateChannels) => {
    let result = false;

    let onlyNewChannels = newStateChannels.filter(comparer(prevStateChannels));

    if (onlyNewChannels.length > 0) {
        if (onlyNewChannels) {
            onlyNewChannels.forEach(function(data, index) {
                let toastData = { status: 201, data };
                displayToast(toastData, "new_channel");
            });

            result = true;
        }
    } else {
        result = false;
    }

    return result;
};

function comparer(otherArray) {
    return function(current) {
        return (
            otherArray.filter(function(other) {
                return other.channel_identifier === current.channel_identifier;
            }).length === 0
        );
    };
}
