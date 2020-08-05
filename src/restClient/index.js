import axios from "axios";
import { isDevelopment } from "../utils/utils";

const client = axios.create({
  baseURL: isDevelopment() ? "http://localhost:5001" : window.luminoUrl
});

export default client;
