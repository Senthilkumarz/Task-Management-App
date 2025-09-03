import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:4000/api", // backend URL
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get saved token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
