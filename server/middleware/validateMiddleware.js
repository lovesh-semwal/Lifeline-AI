/* ==========================================
   Register Validation
========================================== */

export const validateRegister = (req, res, next) => {
  const {
    fullName,
    email,
    password,
    phone,
  } = req.body;

  if (!fullName || !email || !password || !phone) {
    return res.status(400).json({
      success: false,
      message: "All required fields must be filled.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters.",
    });
  }

  next();
};

/* ==========================================
   Login Validation
========================================== */

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required.",
    });
  }

  next();
};

/* ==========================================
   Emergency Validation
========================================== */

export const validateEmergency = (req, res, next) => {
  const {
    patientName,
    emergencyType,
    description,
    phone,
    address,
  } = req.body;

  if (
    !patientName ||
    !emergencyType ||
    !description ||
    !phone ||
    !address
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all emergency details.",
    });
  }

  next();
};

/* ==========================================
   Blood Donor Validation
========================================== */

export const validateDonor = (req, res, next) => {
  const {
    fullName,
    email,
    phone,
    age,
    gender,
    bloodGroup,
    weight,
    address,
    city,
    state,
    pincode,
    location,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !phone ||
    !age ||
    !gender ||
    !bloodGroup ||
    !weight ||
    !address ||
    !city ||
    !state ||
    !pincode ||
    !location ||
    location.latitude === undefined ||
    location.longitude === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required donor details.",
    });
  }

  next();
};

/* ==========================================
   Hospital Validation
========================================== */

export const validateHospital = (req, res, next) => {
  const {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    latitude,
    longitude,
  } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !pincode ||
    !latitude ||
    !longitude
  ) {
    return res.status(400).json({
      success: false,
      message: "Hospital information is incomplete.",
    });
  }

  next();
};