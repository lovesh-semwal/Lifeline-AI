import {
  FaHospital,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaBed,
  FaLocationArrow,
} from "react-icons/fa";

const HospitalCard = ({
  hospital,
  image,
  name,
  address,
  phone,
  rating,
  beds,
  distance,
  lat,
  lon,
}) => {

const openMaps = () => {
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
    "_blank"
  );
};
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      {/* Hospital Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover"
      />

      <div className="p-6">

        {/* Hospital Name */}
        <div className="flex items-center gap-2 mb-3">
          <FaHospital className="text-red-600 text-xl" />
          <h2 className="text-2xl font-bold text-gray-800">
            {name}
          </h2>
        </div>

        {/* Address */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaMapMarkerAlt className="text-red-500" />
          <span>{address}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaPhoneAlt className="text-green-600" />
          <span>{phone}</span>
        </div>

        {/* Available Beds */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaBed className="text-blue-600" />
          <span>{beds} Beds Available</span>
        </div>

        {/* Distance */}
        <div className="flex items-center gap-2 text-gray-600 mb-5">
          <FaLocationArrow className="text-purple-600" />
          <span>{distance} Km miles Away</span>
        </div>

        {/* Button */}
        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          onClick={openMaps}
        >
          Get Directions
        </button>

      </div>
    </div>
  );
};

export default HospitalCard;