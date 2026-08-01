import { getNearbyHospitalsService } from "../services/hospitalService.js";
import upload from "../middleware/uploadMiddleware.js";
import express from "express";

import {
  addHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  deleteHospital,
  getNearbyHospitals,
  searchHospital,
} from "../controllers/hospitalController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { validateHospital } from "../middleware/validateMiddleware.js";

const router = express.Router();

/* =====================================
   Public Routes
===================================== */

// Get all hospitals
router.get("/", getAllHospitals);

// Search hospitals
router.get("/search", searchHospital);

// Nearby hospitals
router.get("/nearby", getNearbyHospitals);

router.get("/real", async (req, res) => {
  try {
    const hospitals = await getNearbyHospitalsService(
      28.6139,
      77.2090
    );

    res.json({
      success: true,
      hospitals,
    });
  } catch (error) {
  console.log("========== ERROR ==========");
  console.log(error);
  console.log("===========================");

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
});

// Get hospital by ID
router.get("/:id", getHospitalById);

/* =====================================
   Admin Routes
===================================== */

// Add hospital
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload,
  validateHospital,
  addHospital
);

// Update hospital
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateHospital,
  updateHospital
);

// Delete hospital
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteHospital
);



export default router;