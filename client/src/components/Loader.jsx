import { FaAmbulance } from "react-icons/fa";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-75">

      {/* Ambulance Icon */}
      <FaAmbulance className="text-red-600 text-6xl animate-bounce mb-6" />

      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>

      {/* Loading Text */}
      <h2 className="mt-6 text-xl font-semibold text-gray-700">
        {text}
      </h2>

      <p className="text-gray-500 mt-2 text-center">
        Please wait while we process your request...
      </p>
    </div>
  );
};

export default Loader;