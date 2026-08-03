import { useState, useEffect } from "react";
import axios from "axios";
import BloodDonorCard from "../components/BloodDonorCard";
import donorImage from "../assets/images/profile.png";
import { useNavigate } from "react-router-dom";


const BloodDonors = () => {
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const [donorData, setDonorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/hospitals/real`);
        console.log(data)

        if (data.success) {
          console.log(data.donors)
          setDonorData(data.donors);
        }
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  const filteredDonors = donorData.filter((donor) => {
  const name = donor.fullName || donor.name || "";
  const city = donor.city || donor.location || "";

  const matchesSearch =
    name.toLowerCase().includes(search.toLowerCase()) ||
    city.toLowerCase().includes(search.toLowerCase());

  const matchesBloodGroup =
    bloodGroup === "" || donor.bloodGroup === bloodGroup;

  return matchesSearch && matchesBloodGroup;
});

  return (
    <div className="min-h-screen bg-red-50 py-16"> {/* Increased vertical padding */}

  <div className="max-w-7xl mx-auto px-8 space-y-12"> {/* Added horizontal padding and vertical spacing */}

    {/* Heading */}
    <div className="space-y-3 text-center">
      <h1 className="text-5xl font-extrabold text-red-600 tracking-wide">
        Blood Donors
      </h1>
      <p className="text-lg text-gray-600">
        Find blood donors quickly during emergencies.
      </p>
    </div>

    {/* Become Donor Button */}
    <div className="flex justify-center">
      <button
        onClick={() => navigate("/register-donor")}
        className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md"
      >
        Become a Blood Donor
      </button>
    </div>

    {/* Filters */}
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-8 input-blood">
      <input
        type="text"
        placeholder="Search by name or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="md:w-96 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
      />
      <select
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
        className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
      >
        <option value="">All Blood Groups</option>
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

    {/* Donor Cards */}
    {loading ? (
      <div className="text-center text-xl text-gray-500 mt-10">
        Loading donors...
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <BloodDonorCard
              key={donor._id}
              image={donor.profileImage || donorImage}
              name={donor.fullName || donor.name || "Name not available"}
              bloodGroup={donor.bloodGroup || "Not available"}
              location={donor.city || donor.location || "Location not available"}
              phone={donor.phone || "Phone not available"}
              lastDonation={
                donor.lastDonationDate
                  ? new Date(donor.lastDonationDate).toLocaleDateString()
                  : "Not available"
              }
              available={donor.available ?? donor.isAvailable ?? false}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-gray-500">
            No donors found.
          </div>
        )}
      </div>
    )}
  </div>
</div>

  );
};

export default BloodDonors;