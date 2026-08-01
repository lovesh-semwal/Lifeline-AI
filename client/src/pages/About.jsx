import {
  FaHeartbeat,
  FaHospital,
  FaTint,
  FaRobot,
  FaAmbulance,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaAmbulance className="text-4xl text-red-600" />,
      title: "Emergency Reporting",
      description:
        "Report emergencies quickly and share important details to help responders act faster.",
    },
    {
      icon: <FaHospital className="text-4xl text-blue-600" />,
      title: "Nearby Hospitals",
      description:
        "Locate hospitals with emergency facilities and available beds.",
    },
    {
      icon: <FaTint className="text-4xl text-red-500" />,
      title: "Blood Donors",
      description:
        "Search for blood donors by blood group and location during emergencies.",
    },
    {
      icon: <FaRobot className="text-4xl text-purple-600" />,
      title: "AI Assistant",
      description:
        "Get instant first-aid guidance and emergency-related assistance using AI.",
    },
    {
      icon: <FaHeartbeat className="text-4xl text-pink-600" />,
      title: "SOS Support",
      description:
        "Send an SOS alert with your location to speed up emergency response.",
    },
    {
      icon: <FaUsers className="text-4xl text-green-600" />,
      title: "Community Support",
      description:
        "Connect hospitals, volunteers, donors, and patients on one platform.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            About LifeLine AI
          </h1>

          <p className="mt-6 text-lg max-w-3xl mx-auto">
            LifeLine AI is an AI-powered emergency response platform
            designed to help people receive faster medical assistance,
            find hospitals, connect with blood donors, and access
            first-aid guidance during emergencies.
          </p>

        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="bg-white rounded-2xl shadow-lg p-10">

          <h2 className="text-3xl font-bold text-center text-gray-800">
            Our Mission
          </h2>

          <p className="text-gray-600 mt-6 text-center leading-8">
            Our mission is to reduce emergency response time by
            combining Artificial Intelligence, real-time location,
            healthcare resources, and community support into one
            intelligent platform. LifeLine AI aims to make emergency
            assistance more accessible, faster, and more reliable.
          </p>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <h2 className="text-4xl font-bold text-center mb-12">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* Footer Message */}
      <section className="bg-white py-16">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-3xl font-bold text-red-600">
            Together, We Can Save Lives
          </h2>

          <p className="text-gray-600 mt-5 leading-8">
            LifeLine AI is built with the vision of using technology to
            improve emergency healthcare services. Every second matters,
            and our goal is to make those seconds count.
          </p>

        </div>

      </section>

    </div>
  );
};

export default About;