import axios from "../api/axiosInstance";

const REVIEW_API = "/reviews";

export const getReviewsForContent = async (contentType, contentId) => {
  const response = await axios.get(
    `${REVIEW_API}/content/${contentType}/${contentId}`,
  );
  return response.data;
};

export const createReview = async (data) => {
  const response = await axios.post(REVIEW_API, data);
  return response.data.review;
};

export const updateReview = async (id, data) => {
  const response = await axios.put(`${REVIEW_API}/${id}`, data);
  return response.data.review;
};

export const deleteReview = async (id) => {
  const response = await axios.delete(`${REVIEW_API}/${id}`);
  return response.data;
};

// Paginated - matches the My Reviews page (page + limit)
export const getMyReviews = async (page = 1, limit = 10) => {
  const response = await axios.get(`${REVIEW_API}/my`, {
    params: { page, limit },
  });
  return response.data;
};

export const getTopRatedContent = async (limit = 12) => {
  const response = await axios.get(`${REVIEW_API}/top-rated`, {
    params: { limit },
  });
  return response.data.topRated;
};
