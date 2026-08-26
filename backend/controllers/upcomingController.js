const UpcomingContent = require("../models/UpcomingContent");

<<<<<<< HEAD
// Get all upcoming content
const getUpcomingContent = async (req, res) => {
  try {
    const content = await UpcomingContent.find().sort({
      createdAt: -1,
    });

    res.json(content);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add new upcoming content
const addUpcomingContent = async (req, res) => {
  try {
    console.log(req.body);

    const newContent = new UpcomingContent({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      imageUrl: req.body.imageUrl,
      trailerURL: req.body.trailerUrl,
      status: req.body.status,
    });

    const savedContent = await newContent.save();

    res.status(201).json(savedContent);
  } catch (error) {
    console.log(error);

    res.status(400).json({
=======
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
>>>>>>> dev
      message: error.message,
    });
  }
};

<<<<<<< HEAD
// Update upcoming content
const updateUpcomingContent = async (req, res) => {
  try {
    const updatedContent =
      await UpcomingContent.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          genre: req.body.genre,
          releaseDate: req.body.releaseDate,
          imageUrl: req.body.imageUrl,
          trailerURL: req.body.trailerUrl,
          status: req.body.status,
        },
        {
          new: true,
        }
      );

    res.json(updatedContent);
  } catch (error) {
    res.status(400).json({
=======
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
>>>>>>> dev
      message: error.message,
    });
  }
};

<<<<<<< HEAD
// Delete upcoming content
const deleteUpcomingContent = async (req, res) => {
  try {
    await UpcomingContent.findByIdAndDelete(req.params.id);

    res.json({
      message: "Content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
=======
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
>>>>>>> dev
      message: error.message,
    });
  }
};

module.exports = {
<<<<<<< HEAD
  getUpcomingContent,
  addUpcomingContent,
  updateUpcomingContent,
  deleteUpcomingContent,
};
=======
  createUpcoming,
  getUpcoming,
  getMyUpcoming,
  updateUpcoming,
  deleteUpcoming,
};
>>>>>>> dev
