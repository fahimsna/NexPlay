const UserActivity = require("../models/UserActivity");

// =======================
// Add Activity
// =======================

const addActivity = async (req, res) => {
  try {
    const userId = req.user.id;

    const { contentId, contentType, title, posterPath, metadata } = req.body;

    if (!contentId || !contentType || !title) {
      return res.status(400).json({
        message: "contentId, contentType and title are required",
      });
    }

    const allowedTypes = ["movie", "series", "sports"];

    if (!allowedTypes.includes(contentType)) {
      return res.status(400).json({
        message: "Invalid content type",
      });
    }

    /*
     * If the same content was recently viewed,
     * update its timestamp instead of creating
     * unlimited duplicate records.
     */

    const existingActivity = await UserActivity.findOne({
      user: userId,
      contentId: String(contentId),
      contentType,
    });

    if (existingActivity) {
      existingActivity.title = title;

      existingActivity.posterPath = posterPath || null;

      existingActivity.metadata = metadata || {};

      await existingActivity.save();

      return res.status(200).json({
        message: "Activity updated",
        activity: existingActivity,
      });
    }

    const activity = await UserActivity.create({
      user: userId,
      contentId: String(contentId),
      contentType,
      title,
      posterPath: posterPath || null,
      metadata: metadata || {},
    });

    return res.status(201).json({
      message: "Activity recorded",
      activity,
    });
  } catch (error) {
    console.error("Add activity error:", error);

    return res.status(500).json({
      message: "Failed to record activity",
    });
  }
};

// =======================
// Get Recent Activity
// =======================

const getRecentActivity = async (req, res) => {
  try {
    const userId = req.user.id;

    const activities = await UserActivity.find({
      user: userId,
    })
      .sort({
        updatedAt: -1,
      })
      .limit(10);

    return res.status(200).json({
      activities,
    });
  } catch (error) {
    console.error("Get recent activity error:", error);

    return res.status(500).json({
      message: "Failed to load recent activity",
    });
  }
};

// =======================
// Get Full Activity History
// =======================

const getActivityHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const activities = await UserActivity.find({
      user: userId,
    }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({
      activities,
    });
  } catch (error) {
    console.error("Get activity history error:", error);

    return res.status(500).json({
      message: "Failed to load activity history",
    });
  }
};

module.exports = {
  addActivity,
  getRecentActivity,
  getActivityHistory,
};
