// ================================
// Capitalize First Letter
// ================================

export const capitalize = (text) => {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};

// ================================
// Format Date
// ================================

export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

// ================================
// Format Time
// ================================

export const formatTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ================================
// Format Date & Time
// ================================

export const formatDateTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-IN");
};

// ================================
// Format Phone Number
// ================================

export const formatPhone = (phone) => {
  if (!phone) return "";

  return phone.replace(/(\d{5})(\d{5})/, "$1 $2");
};

// ================================
// Calculate Distance
// ================================

export const formatDistance = (distance) => {
  if (distance == null) return "";

  return `${distance} km`;
};

// ================================
// Emergency Status Color
// ================================

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "text-yellow-500";

    case "accepted":
      return "text-blue-500";

    case "completed":
      return "text-green-600";

    case "rejected":
      return "text-red-600";

    default:
      return "text-gray-500";
  }
};

// ================================
// Blood Group Color
// ================================

export const getBloodGroupColor = (group) => {
  switch (group) {
    case "A+":
      return "bg-red-500";

    case "A-":
      return "bg-red-400";

    case "B+":
      return "bg-blue-500";

    case "B-":
      return "bg-blue-400";

    case "AB+":
      return "bg-purple-600";

    case "AB-":
      return "bg-purple-400";

    case "O+":
      return "bg-green-600";

    case "O-":
      return "bg-green-400";

    default:
      return "bg-gray-500";
  }
};

// ================================
// Image Preview
// ================================

export const getImagePreview = (file) => {
  if (!file) return "";

  return URL.createObjectURL(file);
};

// ================================
// Generate Random ID
// ================================

export const generateId = () => {
  return Math.random().toString(36).substring(2, 10);
};

// ================================
// Copy Text
// ================================

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// ================================
// Open Google Maps
// ================================

export const openGoogleMaps = (location) => {
  if (!location) return;

  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location
  )}`;

  window.open(url, "_blank");
};

// ================================
// Validate Image Type
// ================================

export const isValidImage = (file) => {
  if (!file) return false;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  return allowedTypes.includes(file.type);
};

// ================================
// Validate Image Size (5 MB)
// ================================

export const isValidImageSize = (file) => {
  if (!file) return false;

  return file.size <= 5 * 1024 * 1024;
};

// ================================
// Emergency Badge Color
// ================================

export const getEmergencyColor = (type) => {
  switch (type) {
    case "Road Accident":
      return "bg-orange-500";

    case "Heart Attack":
      return "bg-red-600";

    case "Fire":
      return "bg-red-500";

    case "Flood":
      return "bg-blue-600";

    case "Earthquake":
      return "bg-yellow-600";

    default:
      return "bg-gray-600";
  }
};