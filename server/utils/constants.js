/* =====================================
   User Roles
===================================== */

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
  DOCTOR: "doctor",
  HOSPITAL: "hospital",
};

/* =====================================
   Blood Groups
===================================== */

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

/* =====================================
   Emergency Types
===================================== */

export const EMERGENCY_TYPES = [
  "Road Accident",
  "Heart Attack",
  "Stroke",
  "Fire Burn",
  "Poisoning",
  "Fracture",
  "Pregnancy",
  "Breathing Problem",
  "Electric Shock",
  "Drowning",
  "Snake Bite",
  "Animal Attack",
  "Other",
];

/* =====================================
   Emergency Status
===================================== */

export const EMERGENCY_STATUS = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  AMBULANCE_ASSIGNED: "Ambulance Assigned",
  HOSPITAL_ASSIGNED: "Hospital Assigned",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

/* =====================================
   Emergency Priority
===================================== */

export const EMERGENCY_PRIORITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

/* =====================================
   Hospital Types
===================================== */

export const HOSPITAL_TYPES = [
  "Government",
  "Private",
  "Multi Speciality",
  "Trauma Center",
  "Children Hospital",
  "Cardiac Hospital",
];

/* =====================================
   Pagination
===================================== */

export const DEFAULT_PAGE = 1;

export const DEFAULT_LIMIT = 10;

/* =====================================
   JWT
===================================== */

export const JWT_EXPIRE = "7d";

/* =====================================
   File Upload
===================================== */

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

/* =====================================
   Cloudinary Folder
===================================== */

export const CLOUDINARY_FOLDER = "LifeLineAI";

/* =====================================
   Gemini AI Prompt
===================================== */

export const AI_SYSTEM_PROMPT = `
You are LifeLine AI.

Rules:

- Help users during medical emergencies.
- Give only safe first-aid advice.
- Never prescribe medicines.
- Never diagnose diseases.
- Recommend contacting emergency services for serious situations.
- Keep answers short, simple, and accurate.
`;

/* =====================================
   Success Messages
===================================== */

export const SUCCESS_MESSAGES = {
  LOGIN: "Login successful.",
  REGISTER: "Registration successful.",
  PROFILE_UPDATED: "Profile updated successfully.",
  PASSWORD_UPDATED: "Password updated successfully.",
  EMERGENCY_REPORTED: "Emergency reported successfully.",
  HOSPITAL_ADDED: "Hospital added successfully.",
  DONOR_REGISTERED: "Blood donor registered successfully.",
  CHAT_DELETED: "Chat deleted successfully.",
};

/* =====================================
   Error Messages
===================================== */

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized access.",
  USER_NOT_FOUND: "User not found.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  INVALID_TOKEN: "Invalid or expired token.",
  HOSPITAL_NOT_FOUND: "Hospital not found.",
  DONOR_NOT_FOUND: "Blood donor not found.",
  CHAT_NOT_FOUND: "Chat not found.",
  EMERGENCY_NOT_FOUND: "Emergency not found.",
  SERVER_ERROR: "Internal Server Error.",
};