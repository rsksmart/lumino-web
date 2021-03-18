import axios from "axios";
import { isDevelopment } from "../utils/utils";

const client = axios.create({
  baseURL: isDevelopment() ? process.env.REACT_APP_LUMINO_ENDPOINT : window.luminoUrl
});

export default client;
