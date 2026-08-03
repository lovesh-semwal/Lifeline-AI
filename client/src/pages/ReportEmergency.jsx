import api from "../services/api";
import { useState } from "react";
import {
  FaAmbulance,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCamera,
} from "react-icons/fa";

const ReportEmergency = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    emergencyType: "",
    description: "",
    address: "",
    phone: "",
    latitude: "",
    longitude: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        alert("Unable to fetch location");
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("patientName", formData.patientName);
      data.append("emergencyType", formData.emergencyType);
      data.append("description", formData.description);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);

      if (formData.image) {
        data.append("image", formData.image);
      }

      

      const response = await api.post("/emergency", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert(response.data.message);

      setFormData({
        patientName: "",
        emergencyType: "",
        description: "",
        address: "",
        phone: "",
        latitude: "",
        longitude: "",
        image: null,
      });

      e.target.reset();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit emergency");
    }
  };

  return (
  <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-100 pt-24 pb-16 px-6">
    <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

      {/* ================= LEFT PANEL ================= */}

      <div className="bg-linear-to-br from-red-600 via-red-700 to-red-800 rounded-3xl shadow-2xl p-14 text-white flex flex-col justify-center">

        <FaAmbulance className="text-8xl mb-8 drop-shadow-lg" />

        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Report Emergency
        </h1>

        <p className="text-xl leading-9 text-red-100 mb-12">
          Quickly report an emergency with accurate details.
          Our intelligent system instantly notifies nearby hospitals,
          emergency responders and medical teams to ensure faster
          medical assistance.
        </p>

        <div className="space-y-8">

          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-full">
              <FaMapMarkerAlt className="text-2xl" />
            </div>

            <div>
              <h3 className="font-bold text-xl">
                Live Location Detection
              </h3>

              <p className="text-red-100">
                Share your exact GPS location instantly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-full">
              <FaPhoneAlt className="text-2xl" />
            </div>

            <div>
              <h3 className="font-bold text-xl">
                Instant Contact Sharing
              </h3>

              <p className="text-red-100">
                Responders can immediately contact you.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="bg-white/20 p-4 rounded-full">
              <FaCamera className="text-2xl" />
            </div>

            <div>
              <h3 className="font-bold text-xl">
                Upload Incident Image
              </h3>

              <p className="text-red-100">
                Help hospitals understand the emergency.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* ================= RIGHT PANEL ================= */}

      <div className="bg-white rounded-3xl shadow-2xl p-12">

        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Emergency Details
        </h2>

        <p className="text-gray-500 mb-10">
          Fill all required information carefully.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Patient Name */}

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Patient Name
            </label>

            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient's full name"
              required
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Emergency Type */}

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Emergency Type
            </label>

            <select
              name="emergencyType"
              value={formData.emergencyType}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Emergency</option>
              <option value="Accident">🚗 Road Accident</option>
              <option value="Pregnancy">🤰 Pregnancy</option>
              <option value="Fire">🔥 Fire</option>
              <option value="Heart Attack">❤️ Heart Attack</option>
              <option value="Flood">🌊 Flood</option>
              <option value="Earthquake">🌍 Earthquake</option>
              <option value="Other">⚠️ Other</option>
            </select>
          </div>

          {/* Description */}

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the emergency in detail..."
              required
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Address */}

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Address
            </label>

            <textarea
              rows={3}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter complete address"
              required
              className="w-full px-5 py-4 text-lg border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Detect Location */}

          <button
            type="button"
            onClick={getCurrentLocation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg"
          >
            <FaMapMarkerAlt />
            Detect Current Location
          </button>

                    {/* Contact Number */}

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Contact Number
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-5 py-4 focus-within:ring-2 focus-within:ring-red-500">

              <FaPhoneAlt className="text-green-600 text-xl mr-4" />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter contact number"
                required
                className="w-full text-lg outline-none"
              />

            </div>
          </div>

          {/* Upload Image */}

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Upload Incident Image
            </label>

            <div className="border-2 border-dashed border-red-300 rounded-2xl p-8 text-center hover:border-red-500 hover:bg-red-50 transition-all duration-300">

              <FaCamera className="mx-auto text-6xl text-red-500 mb-5" />

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="block mx-auto text-gray-600"
              />

              <p className="text-sm text-gray-500 mt-3">
                JPG, PNG or JPEG (Max 5MB)
              </p>

              {formData.image && (
                <div className="mt-8">

                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="w-full max-w-sm mx-auto h-60 object-cover rounded-2xl shadow-lg border"
                  />

                  <p className="mt-4 text-green-600 font-semibold">
                    ✓ Image Selected Successfully
                  </p>

                </div>
              )}

            </div>
          </div>

          {/* Submit Button */}

          <div className="pt-4">

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-5 rounded-2xl text-xl font-bold shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">

                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                  <span>Submitting Emergency...</span>

                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">

                  <FaAmbulance className="text-2xl" />

                  <span>Submit Emergency Report</span>

                </div>
              )}
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
);
};

export default ReportEmergency;
