import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeartbeat,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2">
            <FaHeartbeat className="text-red-500 text-3xl" />
            <h2 className="text-2xl font-bold">
              LifeLine AI
            </h2>
          </div>

          <p className="text-gray-400 mt-4 leading-7">
            LifeLine AI is an AI-powered emergency response platform
            that helps users quickly connect with hospitals, blood
            donors, ambulances, and first-aid guidance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <Link to="/" className="hover:text-red-500">
                Home
              </Link>
            </li>

            <li>
              <Link to="/report" className="hover:text-red-500">
                Report Emergency
              </Link>
            </li>

            <li>
              <Link to="/hospitals" className="hover:text-red-500">
                Hospitals
              </Link>
            </li>

            <li>
              <Link to="/blood-donors" className="hover:text-red-500">
                Blood Donors
              </Link>
            </li>

            <li>
              <Link to="/ai-assistant" className="hover:text-red-500">
                AI Assistant
              </Link>
            </li>
          </ul>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Emergency Contact
          </h3>

          <div className="space-y-4 text-gray-400">

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-red-500" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-500" />
              <span>support@lifelineai.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500" />
              <span>India</span>
            </div>

          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">

            <a
              href="#"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="#"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="#"
              className="hover:text-gray-300 transition"
            >
              <FaGithub />
            </a>

          </div>

          <p className="text-gray-400 mt-5">
            Stay connected for emergency updates and new features.
          </p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} LifeLine AI. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;