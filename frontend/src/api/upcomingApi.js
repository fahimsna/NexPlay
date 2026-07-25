import axios from "axios";

const API = "http://localhost:8000/api/upcoming";

const getToken = () => {
  return localStorage.getItem("token");
};

// CREATE UPCOMING CONTENT

export const createUpcoming = async (data) => {
  const res = await axios.post(
    API,

    data,

    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return res.data;
};

// GET COMPANY UPCOMING CONTENT

export const getUpcoming = async () => {
  const res = await axios.get(
    API,

    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return res.data;
};

// UPDATE UPCOMING CONTENT

export const updateUpcoming = async (id, data) => {
  const res = await axios.put(
    `${API}/${id}`,

    data,

    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return res.data;
};

// DELETE UPCOMING CONTENT

export const deleteUpcoming = async (id) => {
  const res = await axios.delete(
    `${API}/${id}`,

    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  return res.data;
};
