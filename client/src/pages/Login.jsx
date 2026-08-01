import api from "../services/api";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    // Save JWT Token
    localStorage.setItem("token", response.data.token);

    // Save User Data (Optional)
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    alert(response.data.message);

    navigate("/");
  } catch (error) {
    alert(
      error.response?.data?.message || "Login Failed"
    );
  }
};

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/");
  }
}, [navigate]);

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">

        {/* Logo */}
        <div className="text-center">

          <h1 className="text-4xl font-bold text-red-600">
            🚑 LifeLine AI
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome Back
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

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
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 outline-none"
              />

            </div>

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
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Remember */}

          <div className="flex justify-between items-center">

            <label className="flex items-center gap-2">

              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />

              Remember Me

            </label>

            <Link
              to="#"
              className="text-red-600 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login */}

          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

          {/* Divider */}

          <div className="text-center text-gray-500">
            OR
          </div>

          {/* Google */}

          <button
            type="button"
            className="w-full border py-3 rounded-lg flex justify-center items-center gap-3 hover:bg-gray-100 transition"
          >
            <FaGoogle className="text-red-500" />

            Continue with Google
          </button>

          {/* Register */}

          <p className="text-center">

            Don't have an account?

            <Link
              to="/register"
              className="text-red-600 ml-2 font-semibold hover:underline"
            >
              Register
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;