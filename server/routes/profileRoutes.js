import express from "express";

import {
  getProfile,
  updateProfile,
  updatePassword,
  uploadProfileImage,
  deleteProfile,
} from "../controllers/profileController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* =====================================
   Protected Profile Routes
===================================== */

// Get Logged-in User Profile
router.get(
  "/",
  authMiddleware,
  getProfile
);

// Update Profile
router.put(
  "/",
  authMiddleware,
  updateProfile
);

// Update Password
router.put(
  "/password",
  authMiddleware,
  updatePassword
);

// Upload Profile Image
router.put(
  "/image",
  authMiddleware,
  upload,
  uploadProfileImage
);

// Delete Profile
router.delete(
  "/",
  authMiddleware,
  deleteProfile
);

export default router;