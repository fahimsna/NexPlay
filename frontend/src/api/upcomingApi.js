import axios from "axios";

const API_ROOT =
  import.meta.env.VITE_API_URL ||
  "https://nexplay-6jls.onrender.com";

const API_URL = `${API_ROOT.replace(/\/$/, "")}/api`;

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 15000,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const getUpcoming = async () => {
  const response = await API.get("/upcoming");
  return response.data;
};

export const createUpcoming = async (data) => {
  const response = await API.post("/upcoming", data);
  return response.data;
};

export const updateUpcoming = async (id, data) => {
  const response = await API.put(`/upcoming/${id}`, data);
  return response.data;
};

export const deleteUpcoming = async (id) => {
  const response = await API.delete(`/upcoming/${id}`);
  return response.data;
};

export default API;
