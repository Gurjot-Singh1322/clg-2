import express from "express";
const router = express.Router();
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// 🔑 Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// =====================
// REGISTER USER
// =====================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
    message: "User registered successfully",
    token: generateToken(user._id),
    user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// =====================
// LOGIN USER
// =====================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        message: "Login successful",
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;