import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_URL}/api/upcoming`,
});

// JWT TOKEN

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// GET COMPANY UPCOMING

export const getUpcoming = async () => {
  const response = await api.get("/my");

  return response.data;
};

// CREATE

export const createUpcoming = async (data) => {
  const response = await api.post("/", data);

  return response.data;
};

// UPDATE

export const updateUpcoming = async (id, data) => {
  const response = await api.put(`/${id}`, data);

  return response.data;
};

// DELETE

export const deleteUpcoming = async (id) => {
  const response = await api.delete(`/${id}`);

  return response.data;
};
