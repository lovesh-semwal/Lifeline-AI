// ===============================
// Name Validation
// ===============================

export const validateName = (name) => {
  if (!name.trim()) {
    return "Name is required";
  }

  if (name.trim().length < 3) {
    return "Name must be at least 3 characters";
  }

  return "";
};

// ===============================
// Email Validation
// ===============================

export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }

  return "";
};

// ===============================
// Phone Validation
// ===============================

export const validatePhone = (phone) => {
  if (!phone.trim()) {
    return "Phone number is required";
  }

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(phone)) {
    return "Enter a valid 10-digit mobile number";
  }

  return "";
};

// ===============================
// Password Validation
// ===============================

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  if (!passwordRegex.test(password)) {
    return "Password must contain uppercase, lowercase and a number";
  }

  return "";
};

// ===============================
// Confirm Password Validation
// ===============================

export const validateConfirmPassword = (
  password,
  confirmPassword
) => {
  if (!confirmPassword) {
    return "Confirm Password is required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};

// ===============================
// Location Validation
// ===============================

export const validateLocation = (location) => {
  if (!location.trim()) {
    return "Location is required";
  }

  return "";
};

// ===============================
// Description Validation
// ===============================

export const validateDescription = (description) => {
  if (!description.trim()) {
    return "Description is required";
  }

  if (description.length < 10) {
    return "Description must be at least 10 characters";
  }

  return "";
};

// ===============================
// Emergency Type Validation
// ===============================

export const validateEmergencyType = (type) => {
  if (!type) {
    return "Please select an emergency type";
  }

  return "";
};

// ===============================
// Blood Group Validation
// ===============================

export const validateBloodGroup = (group) => {
  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  if (!bloodGroups.includes(group)) {
    return "Invalid blood group";
  }

  return "";
};

// ===============================
// Image Validation
// ===============================

export const validateImage = (file) => {
  if (!file) {
    return "";
  }

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    return "Only JPG, PNG and WEBP images are allowed";
  }

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {
    return "Image size must be less than 5 MB";
  }

  return "";
};

// ===============================
// Complete Registration Validation
// ===============================

export const validateRegisterForm = (data) => {
  return {
    name: validateName(data.name),
    email: validateEmail(data.email),
    phone: validatePhone(data.phone),
    password: validatePassword(data.password),
    confirmPassword: validateConfirmPassword(
      data.password,
      data.confirmPassword
    ),
  };
};

// ===============================
// Complete Login Validation
// ===============================

export const validateLoginForm = (data) => {
  return {
    email: validateEmail(data.email),
    password:
      data.password.trim() === ""
        ? "Password is required"
        : "",
  };
};

// ===============================
// Emergency Report Validation
// ===============================

export const validateEmergencyForm = (data) => {
  return {
    emergencyType: validateEmergencyType(
      data.emergencyType
    ),
    description: validateDescription(
      data.description
    ),
    location: validateLocation(
      data.location
    ),
    phone: validatePhone(
      data.phone
    ),
    image: validateImage(
      data.image
    ),
  };
};