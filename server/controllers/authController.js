import User from "../models/User.js";
import jwt from "jsonwebtoken";

/* ===========================
   Generate JWT Token
=========================== */

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );
};

/* ===========================
   Register User
=========================== */

export const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      bloodGroup,
      address,
    } = req.body;

    // Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      phone,
      bloodGroup,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    console.log("========== REGISTER ERROR ==========");
  console.error(error);
  console.log("Request Body:", req.body);
  console.log("====================================");
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Login User
=========================== */

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Compare password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Get Current User
=========================== */

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===========================
   Logout User
=========================== */

export const logoutUser = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
};