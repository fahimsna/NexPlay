const UpcomingContent = require("../models/UpcomingContent");

// ===============================
// CREATE UPCOMING CONTENT
// ===============================

const createUpcoming = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    console.log("CREATE COMPANY:", userId);

    const content = await UpcomingContent.create({
      ...req.body,

      companyId: userId,
    });

    res.status(201).json(content);
  } catch (error) {
    console.log("CREATE ERROR:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// GET ALL PUBLIC CONTENT
// ===============================

const getUpcoming = async (req, res) => {
  try {
    const contents = await UpcomingContent.find().populate(
      "companyId",
      "companyName",
    );

    res.json(contents);
  } catch (error) {
    console.log("PUBLIC ERROR:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// GET ONLY LOGGED COMPANY CONTENT
// ===============================

const getMyUpcoming = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    console.log("MY COMPANY ID:", userId);

    const contents = await UpcomingContent.find({
      companyId: userId,
    });

    console.log("MY CONTENT COUNT:", contents.length);

    res.json(contents);
  } catch (error) {
    console.log("MY ERROR:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// UPDATE
// ===============================

const updateUpcoming = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const content = await UpcomingContent.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    if (content.companyId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    Object.assign(content, req.body);

    await content.save();

    res.json(content);
  } catch (error) {
    console.log("UPDATE ERROR:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// DELETE
// ===============================

const deleteUpcoming = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const content = await UpcomingContent.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        message: "Content not found",
      });
    }

    console.log("DELETE CONTENT COMPANY:", content.companyId.toString());

    console.log("LOGGED COMPANY:", userId.toString());

    if (content.companyId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await content.deleteOne();

    res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ERROR:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createUpcoming,

  getUpcoming,

  getMyUpcoming,

  updateUpcoming,

  deleteUpcoming,
};
