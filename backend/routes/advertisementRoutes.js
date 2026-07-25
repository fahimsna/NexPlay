const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const {
  createAdvertisement,
  getMyAdvertisements,
  getAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
} = require("../controllers/advertisementController");

// CREATE
router.post(
  "/",
  authMiddleware,
  roleMiddleware("company"),
  upload.single("image"),
  createAdvertisement,
);

// GET ALL MY ADS
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("company"),
  getMyAdvertisements,
);

// GET SINGLE AD
router.get("/:id", authMiddleware, roleMiddleware("company"), getAdvertisement);

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
