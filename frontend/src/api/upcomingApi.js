import axios from "axios";

const API_URL = "http://localhost:8000/api/upcoming";


// Get all upcoming content
export const getUpcomingContent = async () => {
    return await axios.get(API_URL);
};


// Get single content by ID
export const getUpcomingById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};


// Add new upcoming content
export const addUpcomingContent = async (contentData) => {
    return await axios.post(API_URL, contentData);
};


// Update upcoming content
export const updateUpcomingContent = async (id, contentData) => {
    return await axios.put(`${API_URL}/${id}`, contentData);
};


// Delete upcoming content
export const deleteUpcomingContent = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};