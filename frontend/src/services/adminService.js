import axios from "../api/axiosInstance";

const ADMIN_API = "/admin";

export const getDashboardStats = async () => {
  const response = await axios.get(`${ADMIN_API}/dashboard`);
  return response.data;
};

export const getAllCompanies = async (status) => {
  const response = await axios.get(`${ADMIN_API}/companies`, {
    params: status ? { status } : {},
  });
  return response.data.companies;
};

export const approveCompany = async (id) => {
  const response = await axios.put(`${ADMIN_API}/companies/${id}/approve`);
  return response.data.company;
};

export const rejectCompany = async (id, reason) => {
  const response = await axios.put(`${ADMIN_API}/companies/${id}/reject`, {
    reason,
  });
  return response.data.company;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${ADMIN_API}/users`);
  return response.data.users;
};

export const getActivityLog = async (page = 1, limit = 15) => {
  const response = await axios.get(`${ADMIN_API}/activity-log`, {
    params: { page, limit },
  });
  return response.data;
};
