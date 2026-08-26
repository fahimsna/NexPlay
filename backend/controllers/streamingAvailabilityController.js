const StreamingAvailability = require("../models/StreamingAvailability");

const createAvailability = async (req, res) => {
  try {
    const availability = await StreamingAvailability.create(req.body);

    const populated = await availability.populate("platform");

    res.status(201).json({
      message: "Streaming availability created successfully",
      availability: populated,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAvailabilityForContent = async (req, res) => {
  try {
    const { mediaType, tmdbId } = req.params;

    const { region } = req.query;

    const filter = {
      mediaType,
      tmdbId: Number(tmdbId),
      isVerified: true,
    };

    if (region) {
      filter.region = { $in: [region, "Global"] };
    }

    const availability = await StreamingAvailability.find(filter)
      .populate("platform")
      .sort({ accessType: 1 });

    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllAvailability = async (req, res) => {
  try {
    const availability = await StreamingAvailability.find()
      .populate("platform")
      .sort({ createdAt: -1 });

    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const availability = await StreamingAvailability.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    ).populate("platform");

    if (!availability) {
      return res.status(404).json({
        message: "Streaming availability record not found",
      });
    }

    res.status(200).json({
      message: "Streaming availability updated successfully",
      availability,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAvailability = async (req, res) => {
  try {
    const availability = await StreamingAvailability.findByIdAndDelete(
      req.params.id,
    );

    if (!availability) {
      return res.status(404).json({
        message: "Streaming availability record not found",
      });
    }

    res.status(200).json({
      message: "Streaming availability deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAvailability,
  getAvailabilityForContent,
  getAllAvailability,
  updateAvailability,
  deleteAvailability,
};