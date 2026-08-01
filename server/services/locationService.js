import axios from "axios";

/* =========================================
   Calculate Distance (Haversine Formula)
========================================= */

export const calculateDistance = (
  lat1,
  lon1,
  lat2,
  lon2
) => {
  const R = 6371; // Radius of Earth in KM

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((R * c).toFixed(2));
};

/* =========================================
   Get Coordinates From Address
   (OpenStreetMap Nominatim API)
========================================= */

export const getCoordinates = async (address) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "LifeLine-AI/1.0",
        },
      }
    );

    if (!response.data.length) {
      return null;
    }

    return {
      latitude: parseFloat(response.data[0].lat),
      longitude: parseFloat(response.data[0].lon),
    };
  } catch (error) {
    console.error(error);

    throw new Error("Unable to fetch location.");
  }
};

/* =========================================
   Reverse Geocoding
========================================= */

export const getAddress = async (
  latitude,
  longitude
) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat: latitude,
          lon: longitude,
          format: "json",
        },
        headers: {
          "User-Agent": "LifeLine-AI/1.0",
        },
      }
    );

    return response.data.display_name;
  } catch (error) {
    console.error(error);

    throw new Error("Unable to fetch address.");
  }
};

/* =========================================
   Check Radius
========================================= */

export const isWithinRadius = (
  userLat,
  userLng,
  targetLat,
  targetLng,
  radius = 10
) => {
  const distance = calculateDistance(
    userLat,
    userLng,
    targetLat,
    targetLng
  );

  return distance <= radius;
};