import express from "express";

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* =====================================
   Admin Routes
===================================== */

// Get all users
router.get("/", authMiddleware, adminMiddleware, getAllUsers);

// Delete a user
router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

/* =====================================
   Protected Routes
===================================== */

// Get user by ID
router.get("/:id", authMiddleware, getUserById);

// Update user
router.put("/:id", authMiddleware, updateUser);

export default router;