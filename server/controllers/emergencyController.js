import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

import Emergency from "../models/Emergency.js";
import Hospital from "../models/Hospital.js";

/* ==================================
   Report New Emergency
================================== */


export const createEmergency = async (req, res) => {
  try {
    const {
      patientName,
      emergencyType,
      description,
      phone,
      address,
      latitude,
      longitude,
      priority,
    } = req.body;

    const emergency = await Emergency.create({
      reportedBy: req.user._id,

      patientName,
      emergencyType,
      description,
      phone,
      address,
      latitude,
      longitude,
      priority: priority || "Critical",

      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Emergency created successfully",
      emergency,
    });
  } catch (error) {
    console.error("Create Emergency Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const reportEmergency = async (req, res) => {
  try {
    let imageUrl = "";

    // Upload image if available
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "LifeLineAI",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
      });

      imageUrl = result.secure_url;
    }

    const emergency = await Emergency.create({
      reportedBy: req.user._id,

      patientName: req.body.patientName,

      emergencyType: req.body.emergencyType,

      description: req.body.description,

      phone: req.body.phone,

      address: req.body.address,

      latitude: Number(req.body.latitude),

      longitude: Number(req.body.longitude),

      image: imageUrl,

      priority: req.body.priority || "Medium",

      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Emergency Report Submitted Successfully",

      emergency,
    });
  } catch (error) {
    console.error("Report Emergency Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==================================
   Get All Emergencies
================================== */

export const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .populate("reportedBy", "fullName phone")
      .populate("hospital", "name phone address");

    res.status(200).json({
      success: true,
      count: emergencies.length,
      emergencies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==================================
   Get Emergency By ID
================================== */

export const getEmergencyById = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id)
      .populate("reportedBy", "fullName email phone")
      .populate("hospital");

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency not found",
      });
    }

    res.status(200).json({
      success: true,
      emergency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==================================
   Update Emergency
================================== */

export const updateEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency updated successfully",
      emergency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==================================
   Assign Hospital
================================== */

export const assignHospital = async (req, res) => {
  try {
    const { hospitalId } = req.body;

    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency not found",
      });
    }

    emergency.hospital = hospitalId;
    emergency.status = "Accepted";

    await emergency.save();

    res.status(200).json({
      success: true,
      message: "Hospital assigned successfully",
      emergency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==================================
   Update Emergency Status
================================== */

export const updateEmergencyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency not found",
      });
    }

    emergency.status = status;

    if (status === "Completed") {
      emergency.resolvedAt = new Date();
    }

    await emergency.save();

    res.status(200).json({
      success: true,
      message: "Emergency status updated",
      emergency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==================================
   Delete Emergency
================================== */

export const deleteEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);

    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: "Emergency not found",
      });
    }

    await emergency.deleteOne();

    res.status(200).json({
      success: true,
      message: "Emergency deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getRecentEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      emergencies,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* ==================================
   Get Logged-in User Emergencies
================================== */

export const getMyEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find({
      reportedBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      emergencies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};