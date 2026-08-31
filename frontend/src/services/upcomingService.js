import axios from "axios";

const API = `${(import.meta.env.VITE_API_URL || "https://nexplay-6jls.onrender.com").replace(/\/$/, "")}/api/upcoming`;

const getToken = () => {
  return localStorage.getItem("token");
};

export const getUpcomingContents = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

export const createUpcomingContent = async (data) => {
  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

export const deleteUpcomingContent = async (id) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};
