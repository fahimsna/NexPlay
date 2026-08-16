const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
<<<<<<< HEAD
=======
const { ROLES } = require("../config/roles");
>>>>>>> main

const {
  createUpcoming,
  getUpcoming,
<<<<<<< HEAD
  getMyUpcoming,
=======
>>>>>>> main
  updateUpcoming,
  deleteUpcoming,
} = require("../controllers/upcomingController");

// COMPANY

<<<<<<< HEAD
router.get("/my", authMiddleware, roleMiddleware("company"), getMyUpcoming);
=======
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.COMPANY),
  createUpcoming,
);
>>>>>>> main

router.post("/", authMiddleware, roleMiddleware("company"), createUpcoming);

router.put("/:id", authMiddleware, roleMiddleware("company"), updateUpcoming);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("company"),
  deleteUpcoming,
);

<<<<<<< HEAD
// PUBLIC

router.get("/", getUpcoming);

module.exports = router;
=======
module.exports = router;
>>>>>>> main
