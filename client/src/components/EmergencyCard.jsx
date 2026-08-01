import {
  FaMapMarkerAlt,
  FaClock,
  FaExclamationTriangle,
  FaArrowRight,
} from "react-icons/fa";

const EmergencyCard = ({
  type,
  location,
  severity,
  time,
  status,
  image,
}) => {
  const severityColor = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700",
  };

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Ongoing: "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      {/* Emergency Image */}
      <img
        src={image}
        alt={type}
        className="w-full h-52 object-cover"
      />

      <div className="p-6">

        {/* Emergency Type */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {type}
        </h2>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaMapMarkerAlt className="text-red-600" />
          <span>{location}</span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <FaClock className="text-blue-600" />
          <span>{time}</span>
        </div>

        {/* Severity */}
        <div className="flex items-center gap-2 mb-4">
          <FaExclamationTriangle className="text-orange-600" />

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              severityColor[severity]
            }`}
          >
            {severity}
          </span>
        </div>

        {/* Status */}
        <div className="mb-5">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              statusColor[status]
            }`}
          >
            {status}
          </span>
        </div>

        {/* Button */}
        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700 transition"
        >
          View Details
          <FaArrowRight />
        </button>

      </div>
    </div>
  );
};

export default EmergencyCard;