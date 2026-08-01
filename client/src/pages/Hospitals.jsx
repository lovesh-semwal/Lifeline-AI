import { useState, useEffect } from "react";
import axios from "axios";
import HospitalCard from "../components/HospitalCard";
import hospitalImage from "../assets/images/hospital.png";


const Hospitals = () => {
  const [search, setSearch] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/hospitals/real",
      );

      if (data.success) {
        setHospitals(data.hospitals);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c).toFixed(2);
};

  useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    },
    (error) => {
      console.log(error);
    }
  );
}, []);

  const filteredHospitals = hospitals.filter((hospital) => {
    const name = hospital.displayName?.text || hospital.name || "";

    const address = hospital.formattedAddress || hospital.vicinity || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      address.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
  <div className="min-h-screen bg-gray-100 pt-28 pb-16 px-8">
    <div className="max-w-screen-2xl mx-auto">

      {/* ================= Header ================= */}

      <div className="bg-linear-to-r from-red-600 to-red-500 rounded-3xl p-10 text-white shadow-xl mb-12 hos-header">

        <h1 className="text-5xl font-bold">
          🏥 Nearby Hospitals
        </h1>

        <p className="mt-4 text-xl text-red-100 leading-8">
          Find the nearest hospitals with available beds and
          emergency services around your current location.
        </p>

      </div>

      {/* ================= Search ================= */}

      <div className="mb-12 flex justify-center search-hos">

        <input
          type="text"
          placeholder="🔍 Search hospital or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-2xl rounded-2xl border border-gray-300 bg-white px-6 py-4 text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />

      </div>

      {/* ================= Hospital Cards ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((hospital) => {
            const hospitalLat = hospital.geometry.coordinates[1];
            const hospitalLon = hospital.geometry.coordinates[0];

            const distance = userLocation
              ? calculateDistance(
                  userLocation.lat,
                  userLocation.lon,
                  hospitalLat,
                  hospitalLon
                )
              : "Loading...";

            return (
              <HospitalCard
                key={hospital.properties.place_id}
                hospital={hospital}
                image={hospitalImage}
                name={hospital.properties.name}
                address={hospital.properties.formatted}
                phone={hospital.properties.phone || "Not Available"}
                rating={4.5}
                beds={"Unknown"}
                distance={distance}
                lat={hospitalLat}
                lon={hospitalLon}
              />
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20">

            <h2 className="text-3xl font-bold text-gray-700">
              No Hospitals Found
            </h2>

            <p className="mt-3 text-lg text-gray-500">
              Try searching with another hospital or city.
            </p>

          </div>
        )}

      </div>

    </div>
  </div>
);
};

export default Hospitals;
