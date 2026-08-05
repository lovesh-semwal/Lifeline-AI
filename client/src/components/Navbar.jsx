import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaAmbulance, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Check if user is logged in
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem("token");

    // If you store user data
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `transition duration-200 ${
      isActive
        ? "text-red-600 font-semibold"
        : "text-gray-700 hover:text-red-600"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaAmbulance className="text-red-600 text-3xl" />

          <div>
            <h1 className="text-2xl font-bold text-red-600">
              LifeLine AI
            </h1>

            <p className="text-xs text-gray-500">
              AI Powered. Human Care.
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-[16px] font-medium">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/report" className={navLinkClass}>
              Report Emergency
            </NavLink>
          </li>

          <li>
            <NavLink to="/my-emergencies" className={navLinkClass}>
              My Emergency
            </NavLink>
          </li>

          <li>
            <NavLink to="/hospitals" className={navLinkClass}>
              Hospitals
            </NavLink>
          </li>

          <li>
            <NavLink to="/blood-donors" className={navLinkClass}>
              Blood Donors
            </NavLink>
          </li>

          <li>
            <NavLink to="/ai-assistant" className={navLinkClass}>
              AI Assistant
            </NavLink>
          </li>

          <li>
            <NavLink to="/profile" className={navLinkClass}>
              Profile
            </NavLink>
          </li>
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl text-red-600"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col p-5 gap-4 font-medium">

            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/report" onClick={() => setMenuOpen(false)}>
              Report Emergency
            </NavLink>

            <NavLink to="/my-emergencies" onClick={() => setMenuOpen(false)}>
              My-Emergencies
            </NavLink>

            <NavLink to="/hospitals" onClick={() => setMenuOpen(false)}>
              Hospitals
            </NavLink>

            <NavLink to="/blood-donors" onClick={() => setMenuOpen(false)}>
              Blood Donors
            </NavLink>

            <NavLink to="/ai-assistant" onClick={() => setMenuOpen(false)}>
              AI Assistant
            </NavLink>

            <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </NavLink>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="border border-red-600 text-red-600 rounded-lg py-2 text-center"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-red-600 text-white rounded-lg py-2 text-center"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-600 text-white rounded-lg py-2"
              >
                Logout
              </button>
            )}

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;