import { Link } from "react-router-dom";
import heroBanner from "../assets/images/hero-banner.jpg";
import { FaAmbulance, FaHospital, FaTint } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-red from-red-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

        {/* Left Content */}
        <div className="lg:w-1/2">

          <h1 className="text-5xl font-bold leading-tight text-gray-800">
            AI Powered
            <span className="text-red-600"> Emergency </span>
            Response System
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            LifeLine AI helps people during emergencies by
            providing instant AI assistance, nearby hospitals,
            blood donors, ambulance support, and first-aid guidance.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            <Link
              to="/report"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Report Emergency
            </Link>

            <Link
              to="/hospitals"
              className="border border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition"
            >
              Find Hospitals
            </Link>

          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">


          <Link to="/report">
            <div className="bg-white shadow-md rounded-xl p-5 text-center">
              <FaAmbulance className="text-4xl text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold">Ambulance</h3>
              <p className="text-sm text-gray-500 mt-2">
                Instant emergency support
              </p>
            </div>
          </Link>

          <Link to="/hospitals">
            <div className="bg-white shadow-md rounded-xl p-5 text-center">
              <FaHospital className="text-4xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold">Hospitals</h3>
              <p className="text-sm text-gray-500 mt-2">
                Nearby medical centers
              </p>
            </div>
          </Link>


          <Link to="/blood-donors">
            <div className="bg-white shadow-md rounded-xl p-5 text-center">
              <FaTint className="text-4xl text-red-500 mx-auto mb-3" />
              <h3 className="font-semibold">Blood Donors</h3>
              <p className="text-sm text-gray-500 mt-2">
                Find donors quickly
              </p>
            </div>
          </Link>

          </div>

        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 flex justify-center">

          <img
            src={heroBanner}
            alt="LifeLine AI Hero"
            className="w-full max-w-xl rounded-3xl shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
};

export default HeroSection;