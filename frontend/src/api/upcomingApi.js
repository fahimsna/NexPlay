import axios from "axios";

const API_ROOT =
  import.meta.env.VITE_API_URL ||
  "https://nexplay-6jls.onrender.com";

const API_URL = `${API_ROOT.replace(/\/$/, "")}/api`;

const upcomingApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

upcomingApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default upcomingApi;
