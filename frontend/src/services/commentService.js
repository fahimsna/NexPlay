import axios from "../api/axiosInstance";

export const getComments = async (mediaType, tmdbId) => {
  const response = await axios.get(`/comments/content/${mediaType}/${tmdbId}`);

  return response.data;
};

export const createComment = async (data) => {
  const response = await axios.post("/comments", data);

  return response.data;
};

export const toggleLikeComment = async (id, userId) => {
  const response = await axios.patch(`/comments/${id}/like`, { userId });

  return response.data;
};

export const reportComment = async (id, reason, reportedBy) => {
  const response = await axios.post(`/comments/${id}/report`, {
    reason,
    reportedBy,
  });

  return response.data;
};

export const getReportedComments = async () => {
  const response = await axios.get("/comments/reported");

  return response.data;
};

export const moderateComment = async (id, status) => {
  const response = await axios.patch(`/comments/${id}/moderate`, { status });

  return response.data;
};

export const deleteComment = async (id) => {
  const response = await axios.delete(`/comments/${id}`);

  return response.data;
};