const User = require("../models/User");

// =======================
// GET USER PROFILE
// =======================

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user,
    });
  } catch (error) {
    console.error("Get user profile error:", error);

    res.status(500).json({
      message: "Failed to get user profile",
    });
  }
};

// =======================
// UPDATE USER PROFILE
// =======================

const updateUserProfile = async (req, res) => {
  try {
    const { fullName, username, email } = req.body;

    // =======================
    // VALIDATION
    // =======================

    if (!fullName || !username || !email) {
      return res.status(400).json({
        message: "Full name, username and email are required",
      });
    }

    const cleanFullName = fullName.trim();
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanFullName || !cleanUsername || !cleanEmail) {
      return res.status(400).json({
        message: "All profile fields are required",
      });
    }

    // =======================
    // CHECK USERNAME
    // =======================

    const existingUsername = await User.findOne({
      username: cleanUsername,
      _id: { $ne: req.user.id },
    });

    if (existingUsername) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    // =======================
    // CHECK EMAIL
    // =======================

    const existingEmail = await User.findOne({
      email: cleanEmail,
      _id: { $ne: req.user.id },
    });

    if (existingEmail) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    // =======================
    // UPDATE USER
    // =======================

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        fullName: cleanFullName,
        username: cleanUsername,
        email: cleanEmail,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update user profile error:", error);

    // MongoDB duplicate-key protection
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {})[0];

      if (duplicateField === "username") {
        return res.status(409).json({
          message: "Username is already taken",
        });
      }

      if (duplicateField === "email") {
        return res.status(409).json({
          message: "Email is already registered",
        });
      }
    }

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

// =======================
// UPDATE FAVOURITE GENRES
// =======================

const updateFavouriteGenres = async (req, res) => {
  try {
    const { genres } = req.body;

    if (!Array.isArray(genres)) {
      return res.status(400).json({
        message: "Genres must be an array",
      });
    }

    const cleanedGenres = genres
      .filter((genre) => typeof genre === "string")
      .map((genre) => genre.trim())
      .filter(Boolean);

    const uniqueGenres = [...new Set(cleanedGenres)];

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        favouriteGenres: uniqueGenres,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Favourite genres updated successfully",
      favouriteGenres: user.favouriteGenres,
    });
  } catch (error) {
    console.error("Update favourite genres error:", error);

    res.status(500).json({
      message: "Failed to update favourite genres",
    });
  }
};

// =======================
// UPDATE FAVOURITE SPORTS
// =======================

const updateFavouriteSports = async (req, res) => {
  try {
    const { sports } = req.body;

    if (!Array.isArray(sports)) {
      return res.status(400).json({
        message: "Sports must be an array",
      });
    }

    const cleanedSports = sports
      .filter((sport) => typeof sport === "string")
      .map((sport) => sport.trim())
      .filter(Boolean);

    const uniqueSports = [...new Set(cleanedSports)];

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        favouriteSports: uniqueSports,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Favourite sports updated successfully",
      favouriteSports: user.favouriteSports,
    });
  } catch (error) {
    console.error("Update favourite sports error:", error);

    res.status(500).json({
      message: "Failed to update favourite sports",
    });
  }
};

// =======================
// EXPORT
// =======================

module.exports = {
  getUserProfile,
  updateUserProfile,
  updateFavouriteGenres,
  updateFavouriteSports,
};
