import API from "./api";

// GET COMPANY ANALYTICS

export const getCompanyAnalytics = async () => {
  const response = await API.get("/analytics/company");

  return response.data;
};
