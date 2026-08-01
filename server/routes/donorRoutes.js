import express from "express";

import {
  registerDonor,
  getAllDonors,
  getDonorById,
  searchDonors,
  getNearbyDonors,
  updateDonor,
  deleteDonor,
} from "../controllers/donorController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { validateDonor } from "../middleware/validateMiddleware.js";

const router = express.Router();

/* =====================================
   Public Routes
===================================== */

// Get all blood donors
router.get("/", getAllDonors);

// Search donors by blood group
router.get("/search", searchDonors);

// Find nearby donors
router.get("/nearby", getNearbyDonors);

// Get donor by ID
router.get("/:id", getDonorById);

/* =====================================
   Protected Routes
===================================== */

// Register as blood donor
router.post(
  "/",
  authMiddleware,
  validateDonor,
  registerDonor
);

// Update donor
router.put(
  "/:id",
  authMiddleware,
  validateDonor,
  updateDonor
);

/* =====================================
   Admin Routes
===================================== */

// Delete donor
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteDonor
);

export default router;