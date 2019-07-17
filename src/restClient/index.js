import axios from "axios";
import { isDevelopment } from "../utils/utils";

const client = axios.create({
  baseURL: isDevelopment() ? "http://localhost:5002" : window.luminoUrl
});

export default client;
