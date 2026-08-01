import {
  FaUserCircle,
  FaTint,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCalendarAlt,
  FaHeartbeat,
} from "react-icons/fa";

const BloodDonorCard = ({
  image,
  name,
  bloodGroup,
  location,
  phone,
  lastDonation,
  available,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      {/* Donor Image */}
      <div className="flex justify-center mt-6">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-28 h-28 rounded-full object-cover border-4 border-red-500"
          />
        ) : (
          <FaUserCircle className="text-8xl text-gray-400" />
        )}
      </div>

      <div className="p-6">

        {/* Name */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {name}
        </h2>

        {/* Blood Group */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <FaTint className="text-red-600 text-xl" />
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
            {bloodGroup}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mt-5 text-gray-600">
          <FaMapMarkerAlt className="text-red-500" />
          <span>{location}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <FaPhoneAlt className="text-green-600" />
          <span>{phone}</span>
        </div>

        {/* Last Donation */}
        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <FaCalendarAlt className="text-blue-600" />
          <span>Last Donation: {lastDonation}</span>
        </div>

        {/* Availability */}
        <div className="mt-5 text-center">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {available ? "Available" : "Unavailable"}
          </span>
        </div>

        {/* Button */}
        <button
          disabled={!available}
          className={`w-full mt-6 py-3 rounded-lg flex items-center justify-center gap-2 transition ${
            available
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          <FaHeartbeat />
          Request Blood
        </button>

      </div>
    </div>
  );
};

export default BloodDonorCard;