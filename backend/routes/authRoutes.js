const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC ROUTES

router.post("/register", authController.register);

router.post("/login", authController.login);

// PRIVATE ROUTES

router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
