import API from "./api";

// REGISTER
export const registerService = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

// LOGIN
export const loginService = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

// GET CURRENT USER
export const getMeService = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};

// LOGOUT
export const logoutService = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
