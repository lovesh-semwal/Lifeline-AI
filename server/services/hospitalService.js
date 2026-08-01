import axios from "axios";
import Hospital from "../models/Hospital.js";

/* =====================================
   Calculate Distance (Haversine Formula)
===================================== */

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius (km)

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/* =====================================
   Get All Hospitals
===================================== */

export const getHospitals = async () => {
  return await Hospital.find();
};

/* =====================================
   Find Nearby Hospitals
===================================== */





export const getNearbyHospitalsService = async (lat, lon) => {
  const apiKey = "4138165f5243467b90444c6439006417";

  const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lon},${lat},10000&limit=30&apiKey=${apiKey}`;

  const response = await axios.get(url);

  return response.data.features;
};

/* =====================================
   Hospitals with Available Beds
===================================== */

export const getAvailableHospitals = async (
  userLatitude,
  userLongitude
) => {
  const hospitals = await Hospital.find({
    availableBeds: { $gt: 0 },
  });

  const available = hospitals.map((hospital) => {
    const distance = calculateDistance(
      userLatitude,
      userLongitude,
      hospital.location.latitude,
      hospital.location.longitude
    );

    return {
      ...hospital.toObject(),
      distance,
    };
  });

  available.sort((a, b) => a.distance - b.distance);

  return available;
};

/* =====================================
   Recommend Best Hospital
===================================== */

export const recommendHospital = async (
  userLatitude,
  userLongitude
) => {
  const hospitals = await getAvailableHospitals(
    userLatitude,
    userLongitude
  );

  if (!hospitals.length) {
    return null;
  }

  return hospitals[0];
};