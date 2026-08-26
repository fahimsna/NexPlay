const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/company",
  authMiddleware,
  roleMiddleware("company"),
  (req, res) => {
    res.json({
      message: "Company access granted",
      user: req.user,
    });
  },
);

module.exports = router;
