import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://192.168.1.13:3000" : "http://192.168.1.13:3000",
  withCredentials: true,
});
