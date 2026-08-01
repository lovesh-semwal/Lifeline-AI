import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTint,
  FaSignOutAlt,
} from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-4xl space-y-12 text-center profile-container">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-red-600">My Profile</h1>

        {/* Avatar */}
        <div className="flex flex-col items-center space-y-3">
          <FaUserCircle className="text-9xl text-gray-400" />
          <h2 className="text-3xl font-bold">{user.fullName}</h2>
          <p className="text-gray-500">{user.role.toUpperCase()}</p>
        </div>

        {/* User Information - vertical layout with spacing */}
        <div className="space-y-6 text-left profile-detail">
          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
            <FaEnvelope className="text-red-600 text-2xl" />
            <div>
              <p className="text-gray-500">Email</p>
              <h3 className="font-semibold">{user.email}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
            <FaPhoneAlt className="text-green-600 text-2xl" />
            <div>
              <p className="text-gray-500">Phone</p>
              <h3 className="font-semibold">{user.phone}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
            <FaMapMarkerAlt className="text-blue-600 text-2xl" />
            <div>
              <p className="text-gray-500">Location</p>
              <h3 className="font-semibold">{user.address || "Not Added"}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
            <FaTint className="text-red-500 text-2xl" />
            <div>
              <p className="text-gray-500">Blood Group</p>
              <h3 className="font-semibold">{user.bloodGroup}</h3>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl flex items-center gap-3 justify-center transition profile-logout"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
