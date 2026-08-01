import AIChat from "../components/AIChat";
import {
  FaRobot,
  FaHeartbeat,
  FaHospital,
  FaTint,
} from "react-icons/fa";

const AIAssistant = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <section className="bg-red-600 text-white py-16">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <FaRobot className="text-7xl mx-auto mb-6" />

          <h1 className="text-5xl font-bold">
            LifeLine AI Assistant
          </h1>

          <p className="mt-5 text-lg max-w-3xl mx-auto">
            Your intelligent emergency assistant.
            Ask about first aid, nearby hospitals,
            blood donors, emergency guidance,
            or medical support.
          </p>

        </div>

      </section>

      {/* Quick Help Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold text-center mb-10 AI-Statement">
          What can I help you with?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">

            <FaHeartbeat className="text-5xl text-red-600 mx-auto mb-4" />

            <h3 className="text-xl font-semibold">
              First Aid
            </h3>

            <p className="text-gray-500 mt-3">
              Get quick first-aid guidance for burns,
              fractures, bleeding, CPR, choking,
              and more.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">

            <FaHospital className="text-5xl text-blue-600 mx-auto mb-4" />

            <h3 className="text-xl font-semibold">
              Nearby Hospitals
            </h3>

            <p className="text-gray-500 mt-3">
              Find nearby hospitals with available
              emergency facilities and contact details.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">

            <FaTint className="text-5xl text-red-500 mx-auto mb-4" />

            <h3 className="text-xl font-semibold">
              Blood Donation
            </h3>

            <p className="text-gray-500 mt-3">
              Search for blood donors by blood group
              and location during emergencies.
            </p>

          </div>

        </div>

      </section>

      {/* AI Chat */}
      <section className="max-w-5xl mx-auto px-6 pb-16">

        <AIChat />

      </section>

    </div>
  );
};

export default AIAssistant;