const StreamingPlatform = require("../models/StreamingPlatform");

const createPlatform = async (req, res) => {
  try {
    const platform = await StreamingPlatform.create(req.body);

    res.status(201).json({
      message: "Streaming platform created successfully",
      platform,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "A platform with this name already exists",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

const getPlatforms = async (req, res) => {
  try {
    const { category, region, includeInactive } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (region) {
      filter.regions = { $in: [region, "Global"] };
    }

    if (includeInactive !== "true") {
      filter.isActive = true;
    }

    const platforms = await StreamingPlatform.find(filter).sort({ name: 1 });

    res.status(200).json(platforms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPlatform = async (req, res) => {
  try {
    const platform = await StreamingPlatform.findById(req.params.id);

    if (!platform) {
      return res.status(404).json({
        message: "Streaming platform not found",
      });
    }

    res.status(200).json(platform);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatePlatform = async (req, res) => {
  try {
    const platform = await StreamingPlatform.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!platform) {
      return res.status(404).json({
        message: "Streaming platform not found",
      });
    }

    res.status(200).json({
      message: "Streaming platform updated successfully",
      platform,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePlatform = async (req, res) => {
  try {
    const platform = await StreamingPlatform.findByIdAndDelete(req.params.id);

    if (!platform) {
      return res.status(404).json({
        message: "Streaming platform not found",
      });
    }

    res.status(200).json({
      message: "Streaming platform deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPlatform,
  getPlatforms,
  getPlatform,
  updatePlatform,
  deletePlatform,
};