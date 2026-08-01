// ================================
// API URLs
// ================================

export const API_BASE_URL = "http://localhost:5000/api";

export const AUTH_API = `${API_BASE_URL}/auth`;
export const HOSPITAL_API = `${API_BASE_URL}/hospitals`;
export const DONOR_API = `${API_BASE_URL}/donors`;
export const EMERGENCY_API = `${API_BASE_URL}/emergency`;
export const AI_API = `${API_BASE_URL}/ai`;


// ================================
// Application Information
// ================================

export const APP_NAME = "LifeLine AI";

export const APP_DESCRIPTION =
  "AI-powered Emergency Response and Healthcare Platform";

export const APP_VERSION = "1.0.0";


// ================================
// Emergency Types
// ================================

export const EMERGENCY_TYPES = [
  "Road Accident",
  "Heart Attack",
  "Fire",
  "Burn Injury",
  "Stroke",
  "Medical Emergency",
  "Poisoning",
  "Earthquake",
  "Flood",
  "Other",
];


// ================================
// Blood Groups
// ================================

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];


// ================================
// User Roles
// ================================

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
  HOSPITAL: "hospital",
  DONOR: "donor",
};


// ================================
// Navigation Links
// ================================

export const NAV_LINKS = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Hospitals",
    path: "/hospitals",
  },
  {
    name: "Blood Donors",
    path: "/blood-donors",
  },
  {
    name: "Report Emergency",
    path: "/report",
  },
  {
    name: "AI Assistant",
    path: "/ai-assistant",
  },
  {
    name: "About",
    path: "/about",
  },
];


// ================================
// Local Storage Keys
// ================================

export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
};


// ================================
// Default Messages
// ================================

export const SUCCESS_MESSAGES = {
  LOGIN: "Login Successful!",
  REGISTER: "Registration Successful!",
  REPORT: "Emergency Report Submitted Successfully!",
  LOGOUT: "Logged Out Successfully!",
};

export const ERROR_MESSAGES = {
  LOGIN: "Invalid Email or Password",
  REGISTER: "Registration Failed",
  NETWORK: "Network Error. Please try again.",
  UNKNOWN: "Something went wrong.",
};


// ================================
// Google Maps
// ================================

// Replace with your actual API key later
export const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";


// ================================
// Firebase
// ================================

// Replace with your Firebase config later
export const FIREBASE_PROJECT_ID = "YOUR_FIREBASE_PROJECT_ID";


// ================================
// Gemini AI
// ================================

// Replace with your Gemini API key later
export const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";