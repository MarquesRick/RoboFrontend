import axios from "axios";

export const apiToken = (token = localStorage.getItem("@One:user_token")) =>
  axios.create({
    baseURL: "https://localhost:3333/api",
    headers: { Authorization: `Bearer ${token}` },
  });

export const api = axios.create({
  baseURL: "https://localhost:3333/api",
});
