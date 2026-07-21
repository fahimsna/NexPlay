import axios from "../api/axios";

// Create Company

export const createCompany = async (companyData) => {
  const response = await axios.post("/company", companyData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get All Companies

export const getCompanies = async () => {
  const response = await axios.get("/company");

  return response.data;
};

// Get Single Company

export const getCompany = async (id) => {
  const response = await axios.get(`/company/${id}`);

  return response.data;
};

// Update Company

export const updateCompany = async (id, companyData) => {
  const response = await axios.put(
    `/company/${id}`,

    companyData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

// Delete Company

export const deleteCompany = async (id) => {
  const response = await axios.delete(`/company/${id}`);

  return response.data;
};
