import {isDevelopment} from "../../utils/utils";

export const RSK_RPC_ENDPOINT = isDevelopment() ? "http://localhost:4444": window.chainEndpoint;
