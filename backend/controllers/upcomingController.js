const UpcomingContent = require("../models/UpcomingContent");

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
      message: error.message,
    });
  }
};

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
      message: error.message,
    });
  }
};

// Delete upcoming content
const deleteUpcomingContent = async (req, res) => {
  try {
    await UpcomingContent.findByIdAndDelete(req.params.id);

    res.json({
      message: "Content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUpcomingContent,
  addUpcomingContent,
  updateUpcomingContent,
  deleteUpcomingContent,
};