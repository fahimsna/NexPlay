import axios from "../api/axiosInstance";

const COMPANY_API = "/company";

export const getMyCompany = async () => {
  const response = await axios.get(`${COMPANY_API}/profile`);
  return response.data.company;
};

export const updateMyCompany = async (data) => {
  const response = await axios.put(`${COMPANY_API}/profile`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.company;
};
