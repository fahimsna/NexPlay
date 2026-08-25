const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  checkWatchlist,
} = require("../controllers/watchlistController");

// =======================
// GET ALL WATCHLIST ITEMS
// =======================

router.get("/", authMiddleware, getWatchlist);

// =======================
// CHECK SINGLE ITEM
// =======================

router.get("/:tmdbId/check", authMiddleware, checkWatchlist);

// =======================
// ADD ITEM
// =======================

router.post("/", authMiddleware, addToWatchlist);

// =======================
// REMOVE ITEM
// =======================

router.delete("/:tmdbId", authMiddleware, removeFromWatchlist);

module.exports = router;
