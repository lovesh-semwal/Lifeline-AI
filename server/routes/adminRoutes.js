import express from "express";

import {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUserStatus,
  deleteUser,

  getAllHospitals,
  approveHospital,
  rejectHospital,
  deleteHospital,

  getAllDonors,
  verifyDonor,
  deleteDonor,

  getAllEmergencies,
  resolveEmergency,
  deleteEmergency,

  getReports,
  resolveReport,

  sendNotification,
} from "../controllers/adminController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* =====================================================
   Apply Middleware to All Admin Routes
===================================================== */

router.use(authMiddleware);
router.use(adminMiddleware);

/* =====================================================
   Dashboard
===================================================== */

// Dashboard statistics
router.get("/dashboard", getDashboardStats);

/* =====================================================
   User Management
===================================================== */

// Get all users
router.get("/users", getAllUsers);

// Get single user
router.get("/users/:id", getUserById);

// Activate / Suspend user
router.patch("/users/:id/status", updateUserStatus);

// Delete user
router.delete("/users/:id", deleteUser);

/* =====================================================
   Hospital Management
===================================================== */

// Get all hospitals
router.get("/hospitals", getAllHospitals);

// Approve hospital
router.patch("/hospitals/:id/approve", approveHospital);

// Reject hospital
router.patch("/hospitals/:id/reject", rejectHospital);

// Delete hospital
router.delete("/hospitals/:id", deleteHospital);

/* =====================================================
   Blood Donor Management
===================================================== */

// Get all donors
router.get("/donors", getAllDonors);

// Verify donor
router.patch("/donors/:id/verify", verifyDonor);

// Delete donor
router.delete("/donors/:id", deleteDonor);

/* =====================================================
   Emergency Management
===================================================== */

// Get all emergency requests
router.get("/emergencies", getAllEmergencies);

// Mark emergency as resolved
router.patch("/emergencies/:id/resolve", resolveEmergency);

// Delete emergency
router.delete("/emergencies/:id", deleteEmergency);

/* =====================================================
   Reports & Complaints
===================================================== */

// Get all reports
router.get("/reports", getReports);

// Resolve report
router.patch("/reports/:id/resolve", resolveReport);

/* =====================================================
   Notifications
===================================================== */

// Send notification to users
router.post("/notifications", sendNotification);

export default router;