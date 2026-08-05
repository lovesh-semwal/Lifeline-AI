import { useEffect, useState } from "react";
import API from "../services/api";   // ✅ use shared API instance
import { toast } from "react-toastify";

const MyEmergencies = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmergencies = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/emergency/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle both possible shapes: { emergencies: [...] } or just [...]
      if (Array.isArray(data?.emergencies)) {
        setEmergencies(data.emergencies);
      } else if (Array.isArray(data)) {
        setEmergencies(data);
      } else {
        setEmergencies([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch emergencies"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-14 w-14 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (emergencies.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
          className="w-52"
        />

        <h2 className="text-3xl font-bold mt-5">No Emergencies Found</h2>

        <p className="text-gray-500 mt-2">
          Report your first emergency to see it here.
        </p>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-100 pt-28 pb-16 px-8">
    <div className="max-w-screen-2xl mx-auto space-y-12">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10">

        {/* Left Banner */}

        <div className="flex-1 bg-linear-to-r from-red-600 via-red-500 to-red-600 rounded-3xl shadow-xl p-10 myh">

          <h1 className="text-5xl font-bold text-white">
            🚨 My Emergencies
          </h1>

          <p className="mt-4 text-red-100 text-xl leading-8">
            Track all your reported emergencies and monitor
            their current status in real time.
          </p>

        </div>

        {/* Total Reports */}

        <div className="bg-white rounded-3xl shadow-xl px-10 py-8 min-w-60 text-center tr">

          <p className="text-gray-500 text-xl">
            Total Reports
          </p>

          <h2 className="text-6xl font-bold text-red-600 mt-3">
            {emergencies.length}
          </h2>

        </div>

      </div>

      {/* ================= SEARCH + REFRESH ================= */}

      

      {/* ================= DASHBOARD STATS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  dashboard-stats">

        {/* Total */}

        <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

          <p className="text-gray-500 text-lg">
            Total Emergencies
          </p>

          <h2 className="text-5xl font-bold text-red-600 mt-4">
            {emergencies.length}
          </h2>

        </div>

        {/* Pending */}

        <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

          <p className="text-gray-500 text-lg">
            Pending Cases
          </p>

          <h2 className="text-5xl font-bold text-yellow-500 mt-4">
            {
              emergencies.filter(
                (e) => e.status === "Pending"
              ).length
            }
          </h2>

        </div>

        {/* Completed */}

        <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

          <p className="text-gray-500 text-lg">
            Completed Cases
          </p>

          <h2 className="text-5xl font-bold text-green-600 mt-4">
            {
              emergencies.filter(
                (e) => e.status === "Completed"
              ).length
            }
          </h2>

        </div>

      </div>

      {/* ================= EMERGENCY CARDS ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">

        {emergencies.map((emergency) => (          <div
            key={emergency._id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <img
              src={
                emergency.image ||
                "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800"
              }
              alt="Emergency"
              className="w-full h-72 object-cover"
            />

            {/* Content */}
            <div className="p-10 space-y-8">

              {/* Emergency Type + Status */}

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <h2 className="text-3xl font-bold text-gray-800">
                  {emergency.emergencyType}
                </h2>

                <span
                  className={`px-5 py-2 rounded-full text-sm font-bold self-start

                  ${
                    emergency.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : emergency.status === "Assigned"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {emergency.status}
                </span>

              </div>

              {/* Description */}

              <div>

                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Description
                </h3>

                <p className="text-gray-600 leading-8">
                  {emergency.description}
                </p>

              </div>

              {/* Divider */}

              <hr />

              {/* Details */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                <div>
                  <p className="text-gray-500 text-sm">
                    Patient Name
                  </p>

                  <p className="text-lg font-semibold mt-1">
                    👤 {emergency.patientName}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Contact Number
                  </p>

                  <p className="text-lg font-semibold mt-1">
                    📞 {emergency.phone}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Priority
                  </p>

                  <p className="text-lg font-semibold mt-1">
                    ⚡ {emergency.priority}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Assigned Hospital
                  </p>

                  <p className="text-lg font-semibold mt-1">
                    🏥{" "}
                    {emergency.hospital
                      ? emergency.hospital.name
                      : "Not Assigned"}
                  </p>
                </div>

              </div>

              {/* Address */}

              <div>

                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Address
                </h3>

                <p className="text-gray-600 leading-7">
                  📍 {emergency.address}
                </p>

              </div>

              {/* Reported On */}

              <div>

                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Reported On
                </h3>

                <p className="text-gray-600">
                  📅 {new Date(emergency.createdAt).toLocaleString()}
                </p>

              </div>

              {/* Button */}

              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-[1.02]">
                View Details
              </button>

            </div>

          </div>
        ))}
      </div>

    </div>

  </div>
);
};

export default MyEmergencies;
