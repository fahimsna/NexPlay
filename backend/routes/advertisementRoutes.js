const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const {
  getMyAdvertisements,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
} = require("../controllers/advertisementController");

// GET COMPANY ADS
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("company"),
  getMyAdvertisements,
);

// CREATE
router.post(
  "/",
  authMiddleware,
  roleMiddleware("company"),
  upload.single("image"),
  createAdvertisement,
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("company"),
  upload.single("image"),
  updateAdvertisement,
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("company"),
  deleteAdvertisement,
);

module.exports = router;
