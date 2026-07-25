import axiosInstance from "../api/axiosInstance";

// GET MY CAMPAIGNS

export const getMyCampaigns = async () => {
  const res = await axiosInstance.get("/campaigns/my");

  return res.data;
};

// CREATE

export const createCampaign = async (data) => {
  const res = await axiosInstance.post("/campaigns", data);

  return res.data;
};

// UPDATE

export const updateCampaign = async (id, data) => {
  const res = await axiosInstance.put(`/campaigns/${id}`, data);

  return res.data;
};

// DELETE

export const deleteCampaign = async (id) => {
  const res = await axiosInstance.delete(`/campaigns/${id}`);

  return res.data;
};
