import axios from "../api/axiosInstance";

const API = "/advertisements";

// GET MY ADVERTISEMENTS
export const getMyAdvertisements = async () => {
  const response = await axios.get(`${API}/my`);
  return response.data;
};

// CREATE ADVERTISEMENT
export const createAdvertisement = async (data) => {
  const response = await axios.post(API, data);
  return response.data;
};

// UPDATE ADVERTISEMENT
export const updateAdvertisement = async (id, data) => {
  const response = await axios.put(`${API}/${id}`, data);
  return response.data;
};

// DELETE ADVERTISEMENT
export const deleteAdvertisement = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};
