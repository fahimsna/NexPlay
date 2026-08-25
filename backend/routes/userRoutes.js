const express = require("express");

const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
  updateFavouriteGenres,
  updateFavouriteSports,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

// =======================
// USER PROFILE
// =======================

router.get("/profile", authMiddleware, getUserProfile);

router.put("/profile", authMiddleware, updateUserProfile);

// =======================
// FAVOURITE GENRES
// =======================

router.put("/favourites/genres", authMiddleware, updateFavouriteGenres);

// =======================
// FAVOURITE SPORTS
// =======================

router.put("/favourites/sports", authMiddleware, updateFavouriteSports);

module.exports = router;
