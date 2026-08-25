import axios from "../api/axiosInstance";

export const getAvailabilityForContent = async (mediaType, tmdbId, region) => {
  const response = await axios.get(
    `/streaming-availability/content/${mediaType}/${tmdbId}`,
    { params: region ? { region } : {} },
  );

  return response.data;
};

export const getAllAvailability = async () => {
  const response = await axios.get("/streaming-availability");

  return response.data;
};

export const createAvailability = async (data) => {
  const response = await axios.post("/streaming-availability", data);

  return response.data;
};

export const updateAvailability = async (id, data) => {
  const response = await axios.put(`/streaming-availability/${id}`, data);

  return response.data;
};

export const deleteAvailability = async (id) => {
  const response = await axios.delete(`/streaming-availability/${id}`);

  return response.data;
};