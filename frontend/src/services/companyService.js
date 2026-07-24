import axios from "../api/axiosInstance";

const API = "/api/company";

// GET COMPANY PROFILE
export const getMyCompany = async () => {
  const res = await axios.get(`${API}/profile`);

  return res.data.company;
};

// CREATE COMPANY PROFILE
export const createMyCompany = async (data) => {
  const res = await axios.post(`${API}/profile`, data);

  return res.data.company;
};

// UPDATE COMPANY PROFILE
export const updateMyCompany = async (data) => {
  const res = await axios.put(`${API}/profile`, data);

  return res.data.company;
};
