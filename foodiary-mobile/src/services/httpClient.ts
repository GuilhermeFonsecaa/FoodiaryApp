import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://vubza2g1s6.execute-api.us-east-1.amazonaws.com",
});
