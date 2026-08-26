import axios from "../api/axiosInstance";

// =======================
// Record Activity
// =======================

export async function recordActivity(activityData) {
  const response = await axios.post("/activity", activityData);

  return response.data;
}

// =======================
// Recent Activity
// =======================

export async function getRecentActivity() {
  const response = await axios.get("/activity/recent");

  return response.data.activities || [];
}

// =======================
// Full Activity History
// =======================

export async function getActivityHistory() {
  const response = await axios.get("/activity/history");

  return response.data.activities || [];
}
