import {isDevelopment} from "../../utils/utils";

export const RSK_RPC_ENDPOINT = isDevelopment() ? process.env.REACT_APP_RSK_RPC_ENDPOINT : window.chainEndpoint;
