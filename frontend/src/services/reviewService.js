import API from "./api";

const REVIEW_API = "/reviews";

export const getReviewsForContent = async (contentType, contentId) => {
  const response = await API.get(
    `${REVIEW_API}/content/${contentType}/${contentId}`,
  );
  return response.data;
};

export const createReview = async (data) => {
  const response = await API.post(REVIEW_API, data);
  return response.data.review;
};

export const updateReview = async (id, data) => {
  const response = await API.put(`${REVIEW_API}/${id}`, data);
  return response.data.review;
};

export const deleteReview = async (id) => {
  const response = await API.delete(`${REVIEW_API}/${id}`);
  return response.data;
};

export const getMyReviews = async (page = 1, limit = 10) => {
  const response = await API.get(`${REVIEW_API}/my`, {
    params: { page, limit },
  });
  return response.data;
};

export const getTopRatedContent = async (limit = 12) => {
  const response = await API.get(`${REVIEW_API}/top-rated`, {
    params: { limit },
  });
  return response.data.topRated;
};
