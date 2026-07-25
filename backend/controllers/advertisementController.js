const Advertisement = require("../models/Advertisement");
const Company = require("../models/Company");

// CREATE ADVERTISEMENT
const createAdvertisement = async (req, res) => {
  try {
    console.log("CREATE ADVERTISEMENT");
    console.log("USER:", req.user);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const company = await Company.findOne({
      ownerId: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found",
      });
    }

    const advertisement = await Advertisement.create({
      companyId: company._id,

      title: req.body.title,

      description: req.body.description,

      type: req.body.type || "Banner",

      status: req.body.status || "Draft",

      startDate: req.body.startDate,

      endDate: req.body.endDate,

      image: req.file ? req.file.filename : "",
    });

    console.log("CREATED:", advertisement);

    res.status(201).json({
      message: "Advertisement created successfully",

      advertisement,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MY ADVERTISEMENTS
const getMyAdvertisements = async (req, res) => {
  try {
    const company = await Company.findOne({
      ownerId: req.user.id,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company profile not found",
      });
    }

    const advertisements = await Advertisement.find({
      companyId: company._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(advertisements);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE AD
const getAdvertisement = async (req, res) => {
  try {
    const advertisement = await Advertisement.findById(req.params.id);

    if (!advertisement) {
      return res.status(404).json({
        message: "Advertisement not found",
      });
    }

    res.json(advertisement);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
const updateAdvertisement = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,

      description: req.body.description,

      type: req.body.type,

      status: req.body.status,

      startDate: req.body.startDate,

      endDate: req.body.endDate,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const advertisement = await Advertisement.findByIdAndUpdate(
      req.params.id,

      updateData,

      {
        new: true,
      },
    );

    res.json({
      message: "Advertisement updated",

      advertisement,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
const deleteAdvertisement = async (req, res) => {
  try {
    await Advertisement.findByIdAndDelete(req.params.id);

    res.json({
      message: "Advertisement deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAdvertisement,

  getMyAdvertisements,

  getAdvertisement,

  updateAdvertisement,

  deleteAdvertisement,
};
