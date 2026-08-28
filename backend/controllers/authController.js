const User = require("../models/User");
const Company = require("../models/Company");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GENERATE TOKEN
const generateToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

// REGISTER

const register = async (req, res) => {
  try {
    const { fullName, username, email, password, role, companyName } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // CREATE COMPANY PROFILE

    if (user.role === "company") {
      if (!companyName) {
        return res.status(400).json({
          message: "Company name required",
        });
      }

      await Company.create({
        ownerId: user._id,

        companyName,

        description: "",

        website: "",

        industry: "Entertainment",

        location: "",

        status: "pending",
      });
    }

    res.status(201).json({
      message: "Registration successful",

      user: {
        id: user._id,

        fullName: user.fullName,

        username: user.username,

        email: user.email,

        role: user.role,
      },

      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    res.json({
      message: "Login successful",

      user: {
        id: user._id,

        fullName: user.fullName,

        username: user.username,

        email: user.email,

        role: user.role,
      },

      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CURRENT USER

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,

  login,

  getMe,
};
