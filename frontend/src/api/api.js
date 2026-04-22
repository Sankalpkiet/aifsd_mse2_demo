import axios from "axios";

const API = axios.create({
  baseURL: "https://back-f5ru.onrender.com/api"
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;