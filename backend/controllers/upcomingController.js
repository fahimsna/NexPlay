const UpcomingContent = require("../models/UpcomingContent");

// COMPANY CREATE
const createUpcoming = async (req, res) => {
  try {
    const content = await UpcomingContent.create({
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      image: req.body.image || req.body.imageUrl || "",
      companyId: req.user.id,

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

// GET ALL
const getUpcoming = async (req, res) => {
  try {
    const contents = await UpcomingContent.find().sort({
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

// UPDATE
const updateUpcoming = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      releaseDate: req.body.releaseDate,
      image: req.body.image || req.body.imageUrl || "",
    };

    const updated = await UpcomingContent.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updated) {
      return res.status(404).json({
        message: "Upcoming content not found",
      });
    }

    return res.json(updated);
  } catch (error) {
    console.error("UPDATE UPCOMING ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
const deleteUpcoming = async (req, res) => {
  try {
    const deleted = await UpcomingContent.findByIdAndDelete(
      req.params.id,
    );

    if (!deleted) {
      return res.status(404).json({
        message: "Upcoming content not found",
      });
    }

      return res.json({
      message: "Deleted",
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
  updateUpcoming,
  deleteUpcoming,
};