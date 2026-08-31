import API from "./api";

export const getFeaturedContent = async (section) => {
  const response = await API.get("/featured-content", {
    params: section ? { section } : {},
  });

  return response.data;
};

export const createFeaturedContent = async (data) => {
  const response = await API.post("/featured-content", data);
  return response.data;
};

export const updateFeaturedContent = async (id, data) => {
  const response = await API.put(`/featured-content/${id}`, data);
  return response.data;
};

export const deleteFeaturedContent = async (id) => {
  const response = await API.delete(`/featured-content/${id}`);
  return response.data;
};
