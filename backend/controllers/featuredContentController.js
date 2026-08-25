const FeaturedContent = require("../models/FeaturedContent");

const createFeaturedContent = async (req, res) => {
  try {
    const { tmdbId, mediaType, title, posterPath, section, order, campaign } =
      req.body;

    const featuredContent = await FeaturedContent.create({
      tmdbId,
      mediaType,
      title,
      posterPath,
      section,
      order,
      campaign: campaign || undefined,
    });

    res.status(201).json({
      message: "Featured content created successfully",
      featuredContent,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This title is already in that section",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};

const getFeaturedContent = async (req, res) => {
  try {
    const { section, includeInactive } = req.query;

    const filter = {};

    if (section) {
      filter.section = section;
    }

    if (includeInactive !== "true") {
      filter.isActive = true;
    }

    const featuredContent = await FeaturedContent.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .populate("campaign");

    res.status(200).json(featuredContent);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateFeaturedContent = async (req, res) => {
  try {
    const featuredContent = await FeaturedContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!featuredContent) {
      return res.status(404).json({
        message: "Featured content not found",
      });
    }

    res.status(200).json({
      message: "Featured content updated successfully",
      featuredContent,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteFeaturedContent = async (req, res) => {
  try {
    const featuredContent = await FeaturedContent.findByIdAndDelete(
      req.params.id,
    );

    if (!featuredContent) {
      return res.status(404).json({
        message: "Featured content not found",
      });
    }

    res.status(200).json({
      message: "Featured content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createFeaturedContent,
  getFeaturedContent,
  updateFeaturedContent,
  deleteFeaturedContent,
};