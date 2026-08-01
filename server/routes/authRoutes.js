import express from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  validateRegister,
  validateLogin,
} from "../middleware/validateMiddleware.js";

const router = express.Router();

/* ===========================
   Public Routes
=========================== */

// Register User
router.post("/register", validateRegister, registerUser);

// Login User
router.post("/login", validateLogin, loginUser);

/* ===========================
   Protected Routes
=========================== */

// Get Current Logged-in User
router.get("/me", authMiddleware, getCurrentUser);

// Logout User
router.post("/logout", authMiddleware, logoutUser);

export default router;