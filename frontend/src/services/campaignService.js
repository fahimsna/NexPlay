import axios from "../api/axiosInstance";

const CAMPAIGN_API = "/campaigns";

// CREATE CAMPAIGN
export const createCampaign = async (data) => {
  const response = await axios.post(CAMPAIGN_API, data);
  return response.data;
};

// GET MY CAMPAIGNS
export const getMyCampaigns = async () => {
  const response = await axios.get(`${CAMPAIGN_API}/my`);
  return response.data;
};

// GET SINGLE CAMPAIGN
export const getCampaign = async (id) => {
  const response = await axios.get(`${CAMPAIGN_API}/${id}`);
  return response.data;
};

// UPDATE CAMPAIGN
export const updateCampaign = async (id, data) => {
  const response = await axios.put(`${CAMPAIGN_API}/${id}`, data);
  return response.data;
};

// DELETE CAMPAIGN
export const deleteCampaign = async (id) => {
  const response = await axios.delete(`${CAMPAIGN_API}/${id}`);
  return response.data;
};
