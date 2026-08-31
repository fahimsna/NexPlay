import axios from "axios";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://nexplay-6jls.onrender.com/api"
).replace(/\/$/, "");

const BASE_URL = API_URL.endsWith("/api")
  ? API_URL
  : `${API_URL}/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  },
);

export default axiosInstance;
