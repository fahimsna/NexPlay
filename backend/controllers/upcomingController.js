const UpcomingContent = require("../models/UpcomingContent");

// COMPANY CREATE

const createUpcoming = async (req, res) => {
  try {
    const content = await UpcomingContent.create({
      ...req.body,

      companyId: req.user.id,
    });

    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL

const getUpcoming = async (req, res) => {
  try {
    const contents = await UpcomingContent.find();

    res.json(contents);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE

const updateUpcoming = async (req, res) => {
  try {
    const updated = await UpcomingContent.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
      },
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE

const deleteUpcoming = async (req, res) => {
  try {
    await UpcomingContent.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
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
