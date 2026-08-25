const express = require("express");

const router = express.Router();

const {
  getUserProfile,
  updateFavouriteGenres,
  updateFavouriteSports,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

// =======================
// USER PROFILE
// =======================

router.get("/profile", authMiddleware, getUserProfile);

// =======================
// FAVOURITE GENRES
// =======================

router.put("/favourites/genres", authMiddleware, updateFavouriteGenres);

// =======================
// FAVOURITE SPORTS
// =======================

router.put("/favourites/sports", authMiddleware, updateFavouriteSports);

module.exports = router;
