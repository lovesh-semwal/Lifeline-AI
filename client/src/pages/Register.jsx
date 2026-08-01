import api from "../services/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  bloodGroup: "O+",
  address: "",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await api.post("/auth/register", {
  fullName: formData.fullName,
  email: formData.email,
  phone: formData.phone,
  password: formData.password,
  bloodGroup: formData.bloodGroup,
  address: formData.address,
});

    alert(response.data.message);

    navigate("/login");
  } catch (error) {
    alert(
      error.response?.data?.message || "Registration Failed"
    );
  }
};

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600">
            🚑 LifeLine AI
          </h1>

          <p className="text-gray-500 mt-2">
            Create Your Account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <FaUser className="text-gray-400" />

              <input
                type="text"
                name="fullName"
                required
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <FaPhoneAlt className="text-gray-400" />

              <input
                type="tel"
                name="phone"
                required
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />
            </div>
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
    className="w-full border rounded-lg p-3 outline-none"
  >
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

{/* Address */}
<div>
  <label className="block mb-2 font-medium">
    Address
  </label>

  <textarea
    name="address"
    rows="3"
    placeholder="Enter your address"
    value={formData.address}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 outline-none resize-none"
  />
</div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <FaLock className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <div className="flex items-center border rounded-lg px-3">
              <FaLock className="text-gray-400" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center">
            Already have an account?

            <Link
              to="/login"
              className="text-red-600 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;