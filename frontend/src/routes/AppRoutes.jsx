import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import CompanyDashboardLayout from "../layouts/CompanyDashboardLayout";

// Public Pages
import Home from "../pages/Home";
import Browse from "../pages/Browse";
import Details from "../pages/Details";
import Watchlist from "../pages/Watchlist";
import Movies from "../pages/Movies";
import Series from "../pages/Series";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Partner from "../pages/Partner";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Company Pages
import CompanyDashboard from "../pages/company/CompanyDashboard";
import CompanyProfile from "../pages/company/CompanyProfile";
import CompanySettings from "../pages/company/CompanySettings";

import CampaignManagement from "../pages/company/CampaignManagement";

import AdvertisementManagement from "../pages/company/AdvertisementManagement";

import Analytics from "../pages/company/Analytics";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/browse" element={<Browse />} />

          <Route path="/details/:id" element={<Details />} />

          <Route path="/watchlist" element={<Watchlist />} />

          <Route path="/movies" element={<Movies />} />

          <Route path="/series" element={<Series />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/partner" element={<Partner />} />
        </Route>

        {/* Authentication */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Company Dashboard */}

        <Route
          path="/company"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <CompanyDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CompanyDashboard />} />

          <Route path="profile" element={<CompanyProfile />} />

          <Route path="settings" element={<CompanySettings />} />

          <Route path="campaigns" element={<CampaignManagement />} />

          <Route path="advertisements" element={<AdvertisementManagement />} />

          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
