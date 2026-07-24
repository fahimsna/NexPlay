import axios from "../api/axiosInstance";

const AUTH_API = "/api/auth";

export const loginService = async (credentials) => {
  const response = await axios.post(`${AUTH_API}/login`, credentials);

  return response.data;
};

export const registerService = async (userData) => {
  const response = await axios.post(`${AUTH_API}/register`, userData);

  return response.data;
};

export const getCurrentUserService = async () => {
  const response = await axios.get(`${AUTH_API}/me`);

  return response.data;
};

export const logoutService = async () => {
  await axios.post(`${AUTH_API}/logout`);
};
