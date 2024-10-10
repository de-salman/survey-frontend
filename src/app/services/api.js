import axios from "axios";

const api = axios.create({
  baseURL: "https://survey-server-green.vercel.app/api",
});

export default api;
