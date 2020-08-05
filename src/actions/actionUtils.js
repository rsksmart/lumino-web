import React from "react";
import _ from "lodash";
import { ADDRESS, CHANNEL } from "../lib/search/searchConstants";
import { SUCCESS_MSG_TOAST } from "../lib/toast/toastConstants";
import { toast } from "react-toastify";
import { USER_ADDRESS } from "../config/applicationConstants";

export const addNonEmptyParams = (paramsList, valueList) => {
  let paramObj = {};
  for (let i = 0; i < paramsList.length; i++) {
    if (!_.isEmpty(valueList[i])) {
      paramObj[paramsList[i]] = valueList[i];
    }
  }
  return paramObj;
};

export const mapSuggestions = searchResults => {
  let suggestionResult = [];

  if (searchResults.results) {
    searchResults.results.token_address_matches.forEach(function(tokenValue) {
      // suggestionResult.push({value: tokenValue, type: TOKEN})
    });

    searchResults.results.node_address_matches.forEach(function(nodeAddress) {
      if (nodeAddress !== USER_ADDRESS) {
        suggestionResult.push({ value: nodeAddress, type: ADDRESS });
      }
    });

    searchResults.results.channel_identifiers_matches.forEach(function(
      channelInfo
    ) {
      let value = {
        id: channelInfo.id,
        tokenAddress: channelInfo.token_address,
        networkId: channelInfo.token_network_identifier,
        partnerAddress: channelInfo.partner_address
      };
      suggestionResult.push({ value: value, type: CHANNEL });
    });

    searchResults.results.rns_address_matches.forEach(function(rnsAddress) {
      suggestionResult.push({ value: rnsAddress, type: ADDRESS });
    });
  }

  if (suggestionResult.length === 0) {
    suggestionResult.push({ value: "No suggestions" });
  }
  return suggestionResult;
};

export const getTaskDetail = (action, state) => {
  let taskDetail = {};
  switch (action) {
    case "openChannel":
      taskDetail.inputAddress = state.inputAddress;
      taskDetail.inputToken = state.inputToken;
      taskDetail.inputAmount = state.inputAmount;
      taskDetail.type = "openChannel";
      taskDetail.typeLabel = "Open Channel";
      taskDetail.detail =
        "Address: " +
        taskDetail.inputAddress +
        "\n" +
        "Token: " +
        taskDetail.inputToken +
        "\n" +
        "Amount: " +
        taskDetail.inputAmount;
      break;
    case "closeChannel":
      taskDetail.token = state.token;
      taskDetail.partner = state.partner;
      taskDetail.type = "closeChannel";
      taskDetail.typeLabel = "Close Channel";
      taskDetail.detail =
        "Token: " + taskDetail.token + "\nPartner: " + taskDetail.partner;
      break;
    case "joinNetwork":
      taskDetail.token = state.token;
      taskDetail.funds = state.funds;
      taskDetail.type = "joinNetwork";
      taskDetail.typeLabel = "Join Network";
      taskDetail.detail = `Token: ${taskDetail.token}\n"Funds: ${
        taskDetail.funds
      }`;
      break;
    case "leaveNetwork":
      taskDetail.token = state.token;
      taskDetail.funds = state.funds;
      taskDetail.type = "leaveNetwork";
      taskDetail.typeLabel = "Leave Network";
      taskDetail.detail =
        "Token: " + taskDetail.token + "\nFunds: " + taskDetail.funds;
      break;
    case "deposit":
      taskDetail.token = state.token;
      taskDetail.partner = state.partner;
      taskDetail.type = "deposit";
      taskDetail.typeLabel = "Deposit";
      taskDetail.detail =
        "Token: " + taskDetail.token + "\nPartner: " + taskDetail.partner;
      break;
    case "payment":
      taskDetail.token = state.token;
      taskDetail.partner = state.partner;
      taskDetail.type = "payment";
      taskDetail.typeLabel = "Payment";
      taskDetail.detail =
        "Token: " + taskDetail.token + "\nPartner: " + taskDetail.partner;
      break;
    case "paymentInvoice":
      taskDetail.invoice = state.invoice;
      taskDetail.type = "paymentInvoice";
      taskDetail.typeLabel = "Payment Invoice";
      taskDetail.detail =
          "Invoice: " + taskDetail.invoice;
      break;
    default:
      return null;
  }

  return taskDetail;
};

const getToastDetail = (response, operationType) => {
  let result = buildErrorMessage(response);

  if (response && response.status) {
    let resultOperation = getResultOperation(response.status);

    if (resultOperation === "success") {
      result = buildSuccessMessage(response.data, operationType);
    } else {
      result = buildErrorMessage(response);
    }
  }

  return result;
};

const buildErrorMessage = response => {
  let message = { title: "Error", body: "Request Failed" };
  if (response && response.data) {
    message.body = response.data.errors;
  }
  return message;
};

const buildSuccessMessage = (dataParam, operationType) => {
  let message = {};
  let body = "";
  switch (operationType) {
    case "new_channel":
      body =
        "A new channel: " +
        dataParam.channel_identifier +
        "\n was opened with " +
        dataParam.partner_address +
        " on token " +
        dataParam.token_address;
      message = { title: "New Channel", body: body };
      break;
    case "balance_update":
      body =
        "The balance of channel: " +
        dataParam.channel_identifier +
        "\n with " +
        dataParam.partner_address +
        " was updated by " +
        dataParam.balance +
        " tokens";
      message = { title: "Balance Update", body: body };
      break;
    case "close_channel":
      body =
        "The channel: " +
        dataParam.channel_identifier +
        "\n with partner " +
        dataParam.partner_address +
        " has been closed successfully ";
      message = { title: "Close", body: body };
      break;
    case "deposit_channel":
      body =
        "The channel: " +
        dataParam.channel_identifier +
        "\n has been modified with a deposit of " +
        dataParam.balance;
      message = { title: "Deposit", body: body };
      break;
    case "payment":
      body =
        "A payment of: " +
        dataParam.amount +
        "\n was successfully sent to the partner " +
        dataParam.target_address;
      message = { title: "Transfer successful", body: body };
      break;
    case "invoice":
      body =
          "A payment of: " +
          dataParam.amount +
          "\n was successfully sent to the partner " +
          dataParam.target_address;
      message = { title: "Transfer successful", body: body };
      break;
    case "join_network":
      body = "The request has completed successfully";
      message = { title: "Join Network", body: body };
      break;
    case "leave_network":
      body = "The request has completed successfully";
      message = { title: "Leave Network", body: body };
      break;
    default:
      message = SUCCESS_MSG_TOAST;
  }

  return message;
};

export const displayToast = (response, operationType) => {
  let detail = getToastDetail(response, operationType);
  let resultOperation = undefined;
  if (response && response.status) {
    resultOperation = getResultOperation(response.status);
  }
  if (resultOperation === "success") {
    displaySuccessToast(detail);
  } else {
    displayErrorToast(detail);
  }
};

export const displayErrorToast = detail => {
  toast.error(<ToastTemplate data={detail} />, {
    autoClose: false,
    position: toast.POSITION.TOP_RIGHT
  });
};

const displaySuccessToast = detail => {
  toast.success(<ToastTemplate data={detail} />, {
    position: toast.POSITION.TOP_RIGHT
  });
};

const getResultOperation = status => {
  let result = "error";
  if (status >= 200 && status < 300) {
    result = "success";
  }
  return result;
};

const ToastTemplate = ({ data }) => {
  return (
    <div>
      <div>
        <h4>
          <b>{data.title}</b>
        </h4>
        <p>{data.body}</p>
      </div>
    </div>
  );
};

export const decrementPendingTask = type => ({
  type: type,
  data: {}
});
