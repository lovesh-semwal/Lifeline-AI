import upload from "../middleware/uploadMiddleware.js";
import express from "express";
import Emergency from "../models/Emergency.js";

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

// DELETE /api/emergency/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({ success: false, message: "Emergency not found" });
    }

    // Allow if admin OR creator of the emergency
    if (req.user.role === "admin" || emergency.user.toString() === req.user._id.toString()) {
      await emergency.deleteOne();
      return res.json({ success: true, message: "Emergency deleted successfully" });
    }

    return res.status(403).json({ success: false, message: "Access denied" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



export default router;