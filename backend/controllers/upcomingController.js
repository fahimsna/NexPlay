const UpcomingContent = require("../models/UpcomingContent");

// ===============================
// CREATE UPCOMING CONTENT
// ===============================

const createUpcoming = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    console.log("CREATE COMPANY:", userId);

    const content = await UpcomingContent.create({
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      image: req.body.image || req.body.imageUrl || "",
      companyId: userId,

      // Backend model accepts only:
      // pending, approved, rejected
      status: "pending",
    });

    return res.status(201).json(content);
  } catch (error) {
    console.error("CREATE UPCOMING ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// GET ALL PUBLIC CONTENT
// ===============================

const getUpcoming = async (req, res) => {
  try {
    const contents = await UpcomingContent.find()
      .populate("companyId", "companyName")
      .sort({
        releaseDate: 1,
      });

    return res.json(contents);
  } catch (error) {
    console.error("GET UPCOMING ERROR:", error);

    return res.status(500).json({
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
    }).sort({
      releaseDate: 1,
    });

    console.log("MY CONTENT COUNT:", contents.length);

    return res.json(contents);
  } catch (error) {
    console.error("MY ERROR:", error);

    return res.status(500).json({
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

    // Only the company that created the content can update it
    if (content.companyId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      image: req.body.image || req.body.imageUrl || "",
    };

    Object.assign(content, updateData);

    await content.save();

    return res.json(content);
  } catch (error) {
    console.error("UPDATE UPCOMING ERROR:", error);

    return res.status(500).json({
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

    // Only the company that created the content can delete it
    if (content.companyId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    console.log("DELETE CONTENT COMPANY:", content.companyId.toString());
    console.log("LOGGED COMPANY:", userId.toString());

    await content.deleteOne();

    return res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE UPCOMING ERROR:", error);

    return res.status(500).json({
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
