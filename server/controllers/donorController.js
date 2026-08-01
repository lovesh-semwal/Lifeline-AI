import BloodDonor from "../models/BloodDonor.js";

/* ===============================
   Register Blood Donor
================================ */

export const registerDonor = async (req, res) => {
  try {
    const donor = await BloodDonor.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Blood donor registered successfully",
      donor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Get All Blood Donors
================================ */

export const getAllDonors = async (req, res) => {
  try {
    const donors = await BloodDonor.find();

    res.status(200).json({
      success: true,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Get Donor By ID
================================ */

export const getDonorById = async (req, res) => {
  try {
    const donor = await BloodDonor.findById(req.params.id).populate(
      "user",
      "fullName email phone profileImage"
    );

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Blood donor not found",
      });
    }

    res.status(200).json({
      success: true,
      donor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Search Donors By Blood Group
================================ */

export const searchDonors = async (req, res) => {
  try {
    const { bloodGroup } = req.query;

    const donors = await BloodDonor.find({
      bloodGroup: bloodGroup,
      available: true,
    }).populate("user", "fullName phone");

    res.status(200).json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Get Nearby Donors
================================ */

export const getNearbyDonors = async (req, res) => {
  try {
    const { city } = req.query;

    const donors = await BloodDonor.find({
      city: {
        $regex: city,
        $options: "i",
      },
      available: true,
    }).populate("user", "fullName phone");

    res.status(200).json({
      success: true,
      count: donors.length,
      donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Update Blood Donor
================================ */

export const updateDonor = async (req, res) => {
  try {
    const donor = await BloodDonor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Blood donor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blood donor updated successfully",
      donor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   Delete Blood Donor
================================ */

export const deleteDonor = async (req, res) => {
  try {
    const donor = await BloodDonor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({
        success: false,
        message: "Blood donor not found",
      });
    }

    await donor.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blood donor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};