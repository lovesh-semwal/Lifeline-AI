import { getNearbyHospitalsService } from "../services/hospitalService.js";
import Hospital from "../models/Hospital.js";

/* ===============================
   Add New Hospital
================================ */

import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const addHospital = async (req, res) => {
  try {
    let imageUrl = "";

    // Upload Image (Optional)
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "LifeLineAI/Hospitals" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      imageUrl = result.secure_url;
    }

    const hospital = await Hospital.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,

      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,

      location: {
        latitude: Number(req.body.latitude),
        longitude: Number(req.body.longitude),
      },

      totalBeds: Number(req.body.totalBeds),
      availableBeds: Number(req.body.availableBeds),

      specialties: req.body.specialties
        ? req.body.specialties.split(",").map((item) => item.trim())
        : [],

      rating: Number(req.body.rating),

      ambulanceAvailable: req.body.ambulanceAvailable === "true",
      emergencyAvailable: req.body.emergencyAvailable === "true",
      isVerified: req.body.isVerified === "true",
      isOpen24x7: req.body.isOpen24x7 === "true",

      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Hospital Added Successfully",
      hospital,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Get All Hospitals
================================ */

export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();

    res.status(200).json({
      success: true,
      count: hospitals.length,
      hospitals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Get Hospital By ID
================================ */

export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      success: true,
      hospital,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Update Hospital
================================ */

export const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hospital updated successfully",
      hospital,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Delete Hospital
================================ */

export const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    await hospital.deleteOne();

    res.status(200).json({
      success: true,
      message: "Hospital deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Get Nearby Hospitals
================================ */

export const getNearbyHospitals = async (req, res) => {
  try {
    const { city } = req.query;

    const hospitals = await Hospital.find({
      city: {
        $regex: city,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      count: hospitals.length,
      hospitals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Search Hospital
================================ */

export const searchHospital = async (req, res) => {
  try {
    const { keyword } = req.query;

    const hospitals = await Hospital.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { city: { $regex: keyword, $options: "i" } },
        { specialties: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      hospitals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};