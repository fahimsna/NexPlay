import axios from "../api/axiosInstance";

// =======================
// GET USER PROFILE
// =======================

export async function getUserProfile() {
  const response = await axios.get("/users/profile");

  return response.data.user;
}

// =======================
// UPDATE USER PROFILE
// =======================

export async function updateUserProfile(profileData) {
  const response = await axios.put("/users/profile", {
    fullName: profileData.fullName,
    username: profileData.username,
    email: profileData.email,
  });

  return response.data.user;
}

// =======================
// UPDATE FAVOURITE GENRES
// =======================

export async function updateFavouriteGenres(genres) {
  const response = await axios.put("/users/favourites/genres", {
    genres,
  });

  return response.data.favouriteGenres || [];
}

// =======================
// UPDATE FAVOURITE SPORTS
// =======================

export async function updateFavouriteSports(sports) {
  const response = await axios.put("/users/favourites/sports", {
    sports,
  });

  return response.data.favouriteSports || [];
}
