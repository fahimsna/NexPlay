import axios from "axios";

const API = "http://localhost:8000/api/upcoming";

const config = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getUpcomingContent = () => {
  return axios.get(API, config());
};

export const addUpcomingContent = (data) => {
  return axios.post(API, data, config());
};

export const updateUpcomingContent = (id, data) => {
  return axios.put(`${API}/${id}`, data, config());
};

export const deleteUpcomingContent = (id) => {
  return axios.delete(`${API}/${id}`, config());
};
