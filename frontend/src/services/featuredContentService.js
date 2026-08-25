import axios from "../api/axiosInstance";

export const getFeaturedContent = async (section) => {
  const response = await axios.get("/featured-content", {
    params: section ? { section } : {},
  });

  return response.data;
};

export const createFeaturedContent = async (data) => {
  const response = await axios.post("/featured-content", data);

  return response.data;
};

export const updateFeaturedContent = async (id, data) => {
  const response = await axios.put(`/featured-content/${id}`, data);

  return response.data;
};

export const deleteFeaturedContent = async (id) => {
  const response = await axios.delete(`/featured-content/${id}`);

  return response.data;
};