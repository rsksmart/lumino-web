// This constants should be removed when the web starts up with Lumino backend.
import {isDevelopment} from "../utils/utils";

export const USER_ADDRESS = isDevelopment() ? process.env.REACT_APP_NODE_ADDRESS : window.nodeAddress;
