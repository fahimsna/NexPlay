import API from "./api";

// GET MY ADVERTISEMENTS
export const getMyAdvertisements = async () => {
  const response = await API.get("/advertisements/my");

  return response.data;
};

// CREATE ADVERTISEMENT
export const createAdvertisement = async (data) => {
  const response = await API.post("/advertisements", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// UPDATE ADVERTISEMENT
export const updateAdvertisement = async (id, data) => {
  const response = await API.put(`/advertisements/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// DELETE ADVERTISEMENT
export const deleteAdvertisement = async (id) => {
  const response = await API.delete(`/advertisements/${id}`);

  return response.data;
};
