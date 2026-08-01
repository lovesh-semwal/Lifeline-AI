import upload from "../middleware/uploadMiddleware.js";
import express from "express";

import {
  reportEmergency,
  getAllEmergencies,
  getEmergencyById,
  updateEmergency,
  updateEmergencyStatus,
  assignHospital,
  deleteEmergency,
  getMyEmergencies,
  getRecentEmergencies,
} from "../controllers/emergencyController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { validateEmergency } from "../middleware/validateMiddleware.js";

const router = express.Router();

/* =====================================
   Create Emergency
===================================== */

router.post(
  "/",
  authMiddleware,
  upload,
  validateEmergency,
  reportEmergency
);

/* =====================================
   Get All Emergencies
===================================== */

router.get(
  "/",
  authMiddleware,
  getAllEmergencies
);

/* =====================================
   Get My Emergencies
===================================== */

router.get(
  "/my",
  authMiddleware,
  getMyEmergencies
);

/* =====================================
   Recent Emergencies
===================================== */

router.get(
  "/recent",
  getRecentEmergencies
);

/* =====================================
   Get Emergency By ID
===================================== */

router.get(
  "/:id",
  authMiddleware,
  getEmergencyById
);

/* =====================================
   Update Emergency
===================================== */

router.put(
  "/:id",
  authMiddleware,
  updateEmergency
);

/* =====================================
   Admin Routes
===================================== */

router.put(
  "/:id/assign",
  authMiddleware,
  adminMiddleware,
  assignHospital
);

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateEmergencyStatus
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteEmergency
);

export default router;