import { useState } from "react";
import API from "../services/api";   // ✅ use shared API instance

const RegisterDonor = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    weight: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
    lastDonationDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get user's current location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setMessage("Location detected successfully.");
        setError("");
      },
      () => {
        setError("Unable to get your location. Please allow location access.");
      }
    );
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first to register as a blood donor.");
        setLoading(false);
        return;
      }

      const donorData = {
        ...formData,
        age: Number(formData.age),
        weight: Number(formData.weight),
        location: {
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
        },
      };

      // Remove latitude and longitude from top-level object
      delete donorData.latitude;
      delete donorData.longitude;

      // ✅ Use API instance instead of axios + localhost
      const response = await API.post("/donors", donorData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setMessage("Blood donor registered successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          age: "",
          gender: "",
          bloodGroup: "",
          weight: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          latitude: "",
          longitude: "",
          lastDonationDate: "",
        });
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message ||
          "Something went wrong while registering."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 py-10 px-5">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-red-600 mb-3">
          Register as Blood Donor
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Help save lives by becoming a blood donor.
        </p>

        {/* Success Message */}
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-5 text-center">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Personal Details */}
          <h2 className="text-2xl font-semibold text-red-600 mb-5">
            Personal Details
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Full Name */}
            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block mb-2 font-medium">
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="65"
                placeholder="18 - 65"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-2 font-medium">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block mb-2 font-medium">
                Blood Group
              </label>

              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="block mb-2 font-medium">
                Weight (kg)
              </label>

              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Last Donation Date */}
            <div>
              <label className="block mb-2 font-medium">
                Last Donation Date
              </label>

              <input
                type="date"
                name="lastDonationDate"
                value={formData.lastDonationDate}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

          </div>

          {/* Address Details */}
          <h2 className="text-2xl font-semibold text-red-600 mt-10 mb-5">
            Address Details
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* City */}
            <div>
              <label className="block mb-2 font-medium">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* State */}
            <div>
              <label className="block mb-2 font-medium">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block mb-2 font-medium">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

          </div>

          {/* Location */}
          <h2 className="text-2xl font-semibold text-red-600 mt-10 mb-5">
            Location
          </h2>

          <button
            type="button"
            onClick={getLocation}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition mb-5"
          >
            📍 Get My Current Location
          </button>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Latitude */}
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              readOnly
              placeholder="Latitude"
              required
              className="w-full p-3 border rounded-lg bg-gray-100"
            />

            {/* Longitude */}
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              readOnly
              placeholder="Longitude"
              required
              className="w-full p-3 border rounded-lg bg-gray-100"
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-10 bg-red-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400"
          >
            {loading ? "Registering..." : "Register as Blood Donor"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default RegisterDonor;