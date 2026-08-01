import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-xl w-full text-center">

        {/* Icon */}
        <FaExclamationTriangle className="text-7xl text-red-600 mx-auto mb-6" />

        {/* Error Code */}
        <h1 className="text-7xl font-bold text-gray-800">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-3xl font-semibold mt-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 mt-4 leading-7">
          Sorry, the page you're looking for doesn't exist or has been
          moved. Please return to the home page.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition"
        >
          <FaHome />
          Back to Home
        </Link>

      </div>

    </div>
  );
};

export default NotFound;