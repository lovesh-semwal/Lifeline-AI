import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      default: null,
    },

    patientName: {
      type: String,
      required: true,
    },

    emergencyType: {
  type: String,
  required: true,
  enum: [
    "Accident",
    "Heart Attack",
    "Fire",
    "Stroke",
    "Pregnancy",
    "Blood Requirement",
    "Medical Emergency",
    "Flood",
    "Earthquake",
    "Other",
  ],
},

    description: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Ambulance Assigned",
        "On The Way",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    aiSuggestion: {
      type: String,
      default: "",
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Emergency", emergencySchema);