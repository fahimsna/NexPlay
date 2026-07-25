import axios from "../api/axiosInstance";

const AUTH_API = "/auth";

// LOGIN
export const loginService = async (credentials) => {
  const response = await axios.post(`${AUTH_API}/login`, credentials);

  return response.data;
};

// REGISTER
export const registerService = async (userData) => {
  const response = await axios.post(`${AUTH_API}/register`, userData);

  return response.data;
};

// CURRENT USER
export const getCurrentUserService = async () => {
  const response = await axios.get(`${AUTH_API}/me`);

  return response.data;
};

// LOGOUT
export const logoutService = async () => {
  const response = await axios.post(`${AUTH_API}/logout`);

  return response.data;
};
