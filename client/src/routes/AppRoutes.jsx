import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Hospitals from "../pages/Hospitals";
import BloodDonors from "../pages/BloodDonors";
import ReportEmergency from "../pages/ReportEmergency";
import AIAssistant from "../pages/AIAssistant";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import EmergencyList from "../pages/Admin/EmergencyList";
import AddHospital from "../pages/Admin/AddHospital";
import MyEmergencies from "../pages/MyEmergencies";
import RegisterDonor from "../pages/RegisterDonor";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes with Navbar & Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/hospitals" element={<Hospitals />} />

        <Route path="/blood-donors" element={<BloodDonors />} />

        <Route path="/ai-assistant" element={<AIAssistant />} />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportEmergency />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/register-donor" element={<RegisterDonor />} />

      <Route
  path="/my-emergencies"
  element={
    <ProtectedRoute>
      <MyEmergencies />
    </ProtectedRoute>
  }
/>

      {/* Routes without Navbar & Footer */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
  path="/admin/emergencies"
  element={
    <ProtectedRoute>
      <EmergencyList />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/add-hospital"
  element={<AddHospital />}
/>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;