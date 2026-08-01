import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hospital name is required"],
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    location: {
      latitude: {
        type: Number,
        required: true,
      },

      longitude: {
        type: Number,
        required: true,
      },
    },

    totalBeds: {
      type: Number,
      default: 0,
    },

    availableBeds: {
      type: Number,
      default: 0,
    },

    ambulanceAvailable: {
      type: Boolean,
      default: false,
    },

    emergencyAvailable: {
      type: Boolean,
      default: true,
    },

    specialties: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isOpen24x7: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

export default Hospital;