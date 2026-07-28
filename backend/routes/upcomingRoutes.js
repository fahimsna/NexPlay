const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createUpcoming,
  getUpcoming,
  getMyUpcoming,
  updateUpcoming,
  deleteUpcoming,
} = require("../controllers/upcomingController");

// COMPANY

router.get("/my", authMiddleware, roleMiddleware("company"), getMyUpcoming);

router.post("/", authMiddleware, roleMiddleware("company"), createUpcoming);

router.put("/:id", authMiddleware, roleMiddleware("company"), updateUpcoming);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("company"),
  deleteUpcoming,
);

// PUBLIC

router.get("/", getUpcoming);

module.exports = router;
