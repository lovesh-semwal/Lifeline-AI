import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaAmbulance, FaLocationArrow } from "react-icons/fa";
import { MdEmergency } from "react-icons/md";

const SOSButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSOS = () => {
    setLoading(true);
    setMessage("");

    if (!navigator.geolocation) {
      setLoading(false);
      setMessage("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const token = localStorage.getItem("token");

          const response = await axios.post(
            "http://localhost:5000/api/emergency",
            {
              patientName: "Emergency User",
              emergencyType: "Medical Emergency",
              description:
                "Emergency SOS alert. Immediate assistance required.",
              phone: "Your Phone Number",
              address: `Latitude: ${latitude}, Longitude: ${longitude}`,
              latitude,
              longitude,
              priority: "Critical",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Emergency Created:", response.data);

          setMessage("🚑 SOS Emergency Created Successfully!");

          // Go to My Emergencies page after creating emergency
          setTimeout(() => {
            navigate("/my-emergencies");
          }, 1000);
        } catch (error) {
          console.error("SOS Error:", error.response?.data || error);

          setMessage(
            error.response?.data?.message ||
              "Failed to create emergency"
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);

        if (error.code === error.PERMISSION_DENIED) {
          setMessage("Location permission denied.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setMessage("Location unavailable.");
        } else if (error.code === error.TIMEOUT) {
          setMessage("Location request timed out.");
        } else {
          setMessage("Something went wrong.");
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-8 SOS">

      <MdEmergency className="text-7xl text-red-600 animate-pulse mb-4" />

      <h2 className="text-3xl font-bold text-gray-800">
        Emergency SOS
      </h2>

      <p className="text-gray-500 mt-3 text-center">
        Press the button below to send your current location during an
        emergency.
      </p>

      <button
        onClick={handleSOS}
        disabled={loading}
        className={`mt-8 w-52 h-52 rounded-full text-white text-5xl font-bold shadow-2xl transition transform hover:scale-105 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 animate-pulse"
        }`}
      >
        {loading ? (
          "..."
        ) : (
          <div className="flex flex-col items-center">
            <FaAmbulance className="text-5xl mb-2" />
            SOS
          </div>
        )}
      </button>

      <div className="mt-8 flex items-center gap-2 text-gray-600">
        <FaLocationArrow className="text-red-600" />
        <span>Location Enabled</span>
      </div>

      {message && (
        <div className="mt-6 bg-green-100 text-green-700 px-5 py-3 rounded-lg text-center max-w-md">
          {message}
        </div>
      )}
    </div>
  );
};

export default SOSButton;