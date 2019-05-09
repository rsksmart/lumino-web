import client from "../restClient";
import {
  LEAVE_SUCCEED,
  POLL_TOKENS,
  JOIN_SUCCEED,
  TASK_COMPLETE,
  TASK_FAILED
} from "./types";
import { SUCCESS_MSG_TOAST, FAIL_MSG_TOAST } from "../lib/toast/toastConstants";
import { retrieveTokensData } from "../lib/tokens/tokensLogic.js";
import { getNetworkJoinable } from "../services/tokensServices";
import { toast } from "react-toastify";
import { toWei } from "../lib/amounts/weiConversion";
import { getDecimals } from "../lib/tokens/tokensLogic";
import { decrementPendingTask, displayToast } from "./actionUtils";

export const leaveNetwork = tokenAddress => (dispatch, getState) =>
  new Promise((resolve, reject) =>
    client
      .delete(`/api/v1/connections/` + tokenAddress)
      .then(async response => {
        toast.success(SUCCESS_MSG_TOAST);
        return resolve(dispatch(leaveSucceed(tokenAddress)));
      })
      .catch(error => {
        toast.error(FAIL_MSG_TOAST);
        console.log(JSON.stringify(error));
        return reject(null);
      })
  );

const leaveSucceed = tokenAddress => ({
  type: LEAVE_SUCCEED,
  data: { tokenAddress: tokenAddress }
});

export const joinNetwork = (tokenAddress, funds) => (dispatch, getState) =>
  new Promise((resolve, reject) =>
    client
      .put(`/api/v1/connections/` + tokenAddress, {
        funds: toWei(
          funds,
          getDecimals(tokenAddress, getState().tokenReducer.tokens)
        )
      })
      .then(async response => {
        displayToast(response, "join_network");
        return resolve(
          Promise.all([
            dispatch(decrementPendingTask(TASK_COMPLETE)),
            dispatch(joinSucceed(tokenAddress))
          ])
        );
      })
      .catch(error => {
        displayToast(error.response, null);
        console.log(JSON.stringify(error));
        return resolve(dispatch(decrementPendingTask(TASK_FAILED)));
      })
  );

const joinSucceed = tokenAddress => ({
  type: JOIN_SUCCEED,
  data: { tokenAddress: tokenAddress }
});

export const pollTokens = () => (dispatch, getState) =>
  new Promise((resolve, reject) =>
    client
      .get(`/api/v1/tokens`)
      .then(async response => {
        let tokens = await retrieveTokensData(response.data);
        tokens = await getNetworkJoinable(tokens);
        //  Chequear los que estan en joineando
        return resolve(
          dispatch(
            pollSucceed(
              tokens,
              checkTokensChanged(getState().tokenReducer.tokens, tokens)
            )
          )
        );
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      })
  );

const pollSucceed = (tokens, dataChanged) => ({
  type: POLL_TOKENS,
  data: { tokens: tokens, tokensChanged: dataChanged }
});

const checkTokensChanged = (prevStateTokens, newStateTokens) => {
  if (prevStateTokens.length !== newStateTokens.length) {
    //console.log("Changed "+ prevStateTokens.length + ","  +newStateTokens.length);
    return true;
  } else {
    //console.log("Didnt changed");
    return false;
  }
};
