const UpcomingContent = require("../models/UpcomingContent");

// GET COMPANY CONTENT

const getMyUpcomingContent = async (req, res) => {
  try {
    const contents = await UpcomingContent.find({
      companyId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(contents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE

const addUpcomingContent = async (req, res) => {
  try {
    const content = await UpcomingContent.create({
      companyId: req.user.id,

      title: req.body.title,

      description: req.body.description,

      category: req.body.category,

      genre: req.body.genre,

      imageUrl: req.body.imageUrl,

      trailerUrl: req.body.trailerUrl,

      releaseDate: req.body.releaseDate,

      status: req.body.status,
    });

    res.status(201).json(content);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// UPDATE

const updateUpcomingContent = async (req, res) => {
  try {
    const updated = await UpcomingContent.findOneAndUpdate(
      {
        _id: req.params.id,
        companyId: req.user.id,
      },
      req.body,
      {
        new: true,
      },
    );

    res.json(updated);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE

const deleteUpcomingContent = async (req, res) => {
  try {
    await UpcomingContent.findOneAndDelete({
      _id: req.params.id,

      companyId: req.user.id,
    });

    res.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMyUpcomingContent,
  addUpcomingContent,
  updateUpcomingContent,
  deleteUpcomingContent,
};
