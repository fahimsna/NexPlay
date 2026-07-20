import api from "../api/axios";

// Get all companies
export const getCompanies = async () => {
  const response = await api.get("/company");
  return response.data;
};

// Get single company
export const getCompany = async (id) => {
  const response = await api.get(`/company/${id}`);
  return response.data;
};

// Create company
export const createCompany = async (companyData) => {
  const response = await api.post("/company", companyData);
  return response.data;
};

// Update company
export const updateCompany = async (id, companyData) => {
  const response = await api.put(`/company/${id}`, companyData);
  return response.data;
};

// Delete company
export const deleteCompany = async (id) => {
  const response = await api.delete(`/company/${id}`);
  return response.data;
};
