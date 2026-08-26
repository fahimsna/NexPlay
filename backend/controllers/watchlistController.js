const User = require("../models/User");

// =======================
// GET WATCHLIST
// =======================

const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("watchlist");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const watchlist = [...(user.watchlist || [])].sort(
      (a, b) => new Date(b.addedAt) - new Date(a.addedAt),
    );

    return res.status(200).json({
      watchlist,
    });
  } catch (error) {
    console.error("Get watchlist error:", error);

    return res.status(500).json({
      message: "Failed to load watchlist",
    });
  }
};

// =======================
// ADD TO WATCHLIST
// =======================

const addToWatchlist = async (req, res) => {
  try {
    const {
      tmdbId,
      title,
      posterPath,
      backdropPath,
      overview,
      releaseDate,
      rating,
      contentType,
    } = req.body;

    if (!tmdbId || !title) {
      return res.status(400).json({
        message: "TMDB ID and title are required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.watchlist) {
      user.watchlist = [];
    }

    const alreadyExists = user.watchlist.some(
      (item) =>
        Number(item.tmdbId) === Number(tmdbId) &&
        item.contentType === (contentType || "movie"),
    );

    if (alreadyExists) {
      return res.status(409).json({
        message: "This title is already in your watchlist",
        watchlist: user.watchlist,
      });
    }

    user.watchlist.push({
      tmdbId: Number(tmdbId),
      title,
      posterPath: posterPath || null,
      backdropPath: backdropPath || null,
      overview: overview || "",
      releaseDate: releaseDate || "",
      rating: Number(rating) || 0,
      contentType: contentType || "movie",
      addedAt: new Date(),
    });

    await user.save();

    return res.status(201).json({
      message: "Added to watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error("Add to watchlist error:", error);

    return res.status(500).json({
      message: "Failed to add to watchlist",
    });
  }
};

// =======================
// REMOVE FROM WATCHLIST
// =======================

const removeFromWatchlist = async (req, res) => {
  try {
    const { tmdbId } = req.params;

    const contentType = req.query.type || "movie";

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const originalLength = user.watchlist?.length || 0;

    user.watchlist = (user.watchlist || []).filter(
      (item) =>
        !(
          Number(item.tmdbId) === Number(tmdbId) &&
          item.contentType === contentType
        ),
    );

    if (user.watchlist.length === originalLength) {
      return res.status(404).json({
        message: "Title is not in your watchlist",
      });
    }

    await user.save();

    return res.status(200).json({
      message: "Removed from watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error("Remove from watchlist error:", error);

    return res.status(500).json({
      message: "Failed to remove from watchlist",
    });
  }
};

// =======================
// CHECK WATCHLIST
// =======================

const checkWatchlist = async (req, res) => {
  try {
    const { tmdbId } = req.params;

    const contentType = req.query.type || "movie";

    const user = await User.findById(req.user.id).select("watchlist");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const exists = (user.watchlist || []).some(
      (item) =>
        Number(item.tmdbId) === Number(tmdbId) &&
        item.contentType === contentType,
    );

    return res.status(200).json({
      inWatchlist: exists,
    });
  } catch (error) {
    console.error("Check watchlist error:", error);

    return res.status(500).json({
      message: "Failed to check watchlist",
    });
  }
};

module.exports = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  checkWatchlist,
};
