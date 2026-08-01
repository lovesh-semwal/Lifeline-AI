import { useEffect, useState } from "react";
import { getRecentEmergencies } from "../services/emergencyService";
import { getHospitals } from "../services/hospitalService";
import { Link } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import EmergencyCard from "../components/EmergencyCard";
import HospitalCard from "../components/HospitalCard";
import BloodDonorCard from "../components/BloodDonorCard";
import SOSButton from "../components/SOSButton";
import { getDonors } from "../services/donorService";

import emergencyImg from "../assets/images/emergency.png";
import hospitalImg from "../assets/images/hospital.png";
import donorImg from "../assets/images/profile.png";

const Home = () => {

  const [hospitals, setHospitals] = useState([]);
  

  const [emergencies, setEmergencies] = useState([]);


  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const data = await getDonors();
        setDonors(data.donors);
      } catch (error) {
        console.error("Failed to fetch donors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);


  useEffect(() => {
  const fetchHospitals = async () => {
    try {
      const data = await getHospitals();

      // Show only first 3 hospitals
      setHospitals(data.hospitals.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch hospitals:", error);
    }
  };

  fetchHospitals();
}, []);

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const data = await getRecentEmergencies();
        setEmergencies(data);
      } catch (error) {
        console.error("Failed to fetch emergencies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencies();
  }, []);

  const formatTime = (createdAt) => {
    return new Date(createdAt).toLocaleString();
  };

  return (
    <div className="bg-gray-100">

      {/* Hero Section */}
      <HeroSection />

      {/* Emergency Section */}
       <section className="py-10">
      <h1 className="text-4xl font-bold text-center mb-8 re">
        Recent Emergencies
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">
          Loading emergencies...
        </p>
      ) : emergencies.length === 0 ? (
        <p className="text-center text-gray-500">
          No recent emergencies found.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {emergencies.map((emergency) => (
            <EmergencyCard
              key={emergency._id}
              type={emergency.emergencyType}
              location={emergency.address}
              severity={emergency.priority}
              time={formatTime(emergency.createdAt)}
              status={emergency.status}
              image={emergency.image || "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800"}
            />
          ))}
        </div>
      )}
    </section>

      {/* Hospitals */}

            <section className="py-8 bg-white hospital-home">

  <div className="flex justify-between items-center px-6 mb-6">

    <h2 className="text-4xl font-bold text-gray-800 text-center hh">
      Nearby Hospitals :-
    </h2>

    

  </div>
  <Link
      to="/hospitals"
      className="text-red-800 font-semibold hover:underline text-center hh2"
    >
      View All Hospitals →
    </Link>

  

</section>

      {/* Blood Donors */}
      <section className="py-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 abd">
          Available Blood Donors
        </h2>

        {loading ? (
          <p className="text-center">Loading donors...</p>
        ) : donors.length === 0 ? (
          <p className="text-center">
            No blood donors available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            {donors.map((donor) => (
  <BloodDonorCard
    key={donor._id}
    image={donor.profileImage || donorImg}
    name={donor.fullName}
    bloodGroup={donor.bloodGroup}
    location={donor.city}
    phone={donor.phone}
    lastDonation={
      donor.lastDonationDate
        ? new Date(donor.lastDonationDate).toLocaleDateString()
        : "Not available"
    }
    available={donor.available}
  />
))}
          </div>
        )}
      </section>

      {/* SOS Button */}
      <section className="bg-red-50 py-20">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-10 nih">
            Need Immediate Help?
          </h2>

          <SOSButton />

        </div>

      </section>

    </div>
  );
};

export default Home;