import axios from "../api/axiosInstance";

export const getPlatforms = async (filters = {}) => {
  const response = await axios.get("/streaming-platforms", {
    params: filters,
  });

  return response.data;
};

export const getPlatform = async (id) => {
  const response = await axios.get(`/streaming-platforms/${id}`);

  return response.data;
};

export const createPlatform = async (data) => {
  const response = await axios.post("/streaming-platforms", data);

  return response.data;
};

export const updatePlatform = async (id, data) => {
  const response = await axios.put(`/streaming-platforms/${id}`, data);

  return response.data;
};

export const deletePlatform = async (id) => {
  const response = await axios.delete(`/streaming-platforms/${id}`);

  return response.data;
};