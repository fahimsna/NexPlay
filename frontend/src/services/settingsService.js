import axios from "../api/axiosInstance";

const SETTINGS_API = "/settings";

export const changePassword = async (data) => {
  const response = await axios.put(`${SETTINGS_API}/change-password`, data);

  return response.data;
};
