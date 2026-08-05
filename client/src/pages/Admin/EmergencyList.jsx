import API from "../../services/api";   // ✅ use shared API instance
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  CheckCircle,
  Building2,
  AlertTriangle,
  Clock3,
} from "lucide-react";

const EmergencyList = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEmergencies();
  }, []);

  const fetchEmergencies = async () => {
    try {
      setLoading(true);
      const res = await API.get("/emergency", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmergencies(res.data.emergencies);
    } catch (error) {
      console.log(error);
      alert("Unable to load emergencies");
    } finally {
      setLoading(false);
    }
  };

  const total = emergencies.length;

const pending = emergencies.filter(
  (e) => e.status === "Pending"
).length;

const accepted = emergencies.filter(
  (e) => e.status === "Accepted"
).length;

const completed = emergencies.filter(
  (e) => e.status === "Completed"
).length;


const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Accepted":
      return "bg-blue-100 text-blue-700";

    case "Completed":
      return "bg-green-100 text-green-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

  const fetchHospitals = async () => {
    try {
      const res = await API.get("/hospitals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHospitals(res.data.hospitals);
    } catch (error) {
      console.log(error);
    }
  };

  const assignHospital = async () => {
    try {
      await API.put(`/emergency/${selectedEmergency._id}/assign`, {
        hospitalId: selectedHospital,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Hospital Assigned Successfully");
      setShowAssignModal(false);
      fetchEmergencies();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmergency = async (id) => {
    if (!window.confirm("Delete this emergency?")) return;
    try {
      await API.delete(`/emergency/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmergencies();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  const filteredEmergencies = useMemo(() => {
    return emergencies.filter((item) => {
      const matchesSearch =
        item.patientName?.toLowerCase().includes(search.toLowerCase()) ||
        item.address?.toLowerCase().includes(search.toLowerCase()) ||
        item.phone?.includes(search);

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [emergencies, search, statusFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="w-16 h-16 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-8">
          🚑 Emergency Dashboard
        </h1>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-red-500 text-white rounded-2xl shadow-xl p-6">
            <p>Total Emergencies</p>
            <h2 className="text-4xl font-bold mt-2">{total}</h2>
          </div>

          <div className="bg-yellow-500 text-white rounded-2xl shadow-xl p-6">
            <p>Pending</p>
            <h2 className="text-4xl font-bold mt-2">{pending}</h2>
          </div>

          <div className="bg-blue-500 text-white rounded-2xl shadow-xl p-6">
            <p>Accepted</p>
            <h2 className="text-4xl font-bold mt-2">{accepted}</h2>
          </div>

          <div className="bg-green-600 text-white rounded-2xl shadow-xl p-6">
            <p>Completed</p>
            <h2 className="text-4xl font-bold mt-2">{completed}</h2>
          </div>
        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-lg p-5 mb-8 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative md:w-96">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-5 py-3"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Accepted</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        {/* Emergency Cards */}

        {filteredEmergencies.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <AlertTriangle size={60} className="mx-auto text-red-500 mb-4" />

            <h2 className="text-2xl font-bold">No Emergencies Found</h2>

            <p className="text-gray-500 mt-2">
              There are no emergency reports matching your search.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredEmergencies.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
              >
                {/* Image */}

                <div className="relative">
                  <img
                    src={
                      item.image || "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800"
                        ? item.image || "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800"
                        : "https://placehold.co/800x350?text=No+Image"
                    }
                    alt="Emergency"
                    className="w-full h-60 object-cover"
                  />

                  <span
                    className={`absolute top-4 right-4 px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Body */}

                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {item.patientName}
                    </h2>

                    <span className="text-red-600 font-semibold">
                      {item.emergencyType}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    <p className="text-gray-600">
                      <strong>Description:</strong> {item.description}
                    </p>

                    <p className="text-gray-600">
                      <strong>Phone:</strong> {item.phone}
                    </p>

                    <p className="text-gray-600">
                      <strong>Address:</strong> {item.address}
                    </p>

                    {item.hospital && (
                      <p className="text-green-600 font-semibold">
                        🏥 {item.hospital.name}
                      </p>
                    )}

                    <p className="text-gray-600">
                      <strong>Priority:</strong>{" "}
                      <span className="font-semibold text-red-600">
                        {item.priority}
                      </span>
                    </p>

                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock3 size={16} />

                      <span>{new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Buttons */}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                    <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
                      <Eye size={18} />
                      View
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEmergency(item);
                        fetchHospitals();
                        setShowAssignModal(true);
                      }}
                      className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
                    >
                      <Building2 size={18} />
                      Assign
                    </button>

                    <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl">
                      <CheckCircle size={18} />
                      Complete
                    </button>

                    <button
                      onClick={() => deleteEmergency(item._id)}
                      className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-450px">
            <h2 className="text-2xl font-bold mb-6">Assign Hospital</h2>

            <select
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Hospital</option>

              {hospitals.map((hospital) => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={assignHospital}
                className="px-5 py-2 rounded-lg bg-green-600 text-white"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyList;
