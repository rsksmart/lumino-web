import axios from "axios";

const client = axios.create({
    baseURL: "https://api.coingecko.com/api/v3"
});

export default client;