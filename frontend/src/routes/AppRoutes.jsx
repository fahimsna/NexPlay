import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Browse from "../pages/Browse";
import Movies from "../pages/Movies";
import Series from "../pages/Series";
import Details from "../pages/Details";
import Watchlist from "../pages/Watchlist";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Partner from "../pages/Partner";
import UpcomingReleaseCalendar from "../pages/UpcomingReleaseCalendar";

import CompanySettings from "../pages/company/CompanySettings";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import CompanyDashboard from "../pages/company/CompanyDashboard";
import CompanyProfile from "../pages/company/CompanyProfile";
import AdvertisementManagement from "../pages/company/AdvertisementManagement";
import CampaignManagement from "../pages/company/CampaignManagement";
import CompanyAnalytics from "../pages/company/CompanyAnalytics";
import CompanyUpcomingContent from "../pages/company/CompanyUpcomingContent";

import CompanyDashboardLayout from "../layouts/CompanyDashboardLayout";
import PublicLayout from "../layouts/PublicLayout";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC WEBSITE */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partner" element={<Partner />} />

        {/* Sprint 2: Upcoming Release Calendar */}
        <Route
          path="/calendar"
          element={<UpcomingReleaseCalendar />}
        />

        <Route
          path="/upcoming"
          element={<UpcomingReleaseCalendar />}
        />
      </Route>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* COMPANY DASHBOARD */}
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
        <Route
          path="advertisements"
          element={<AdvertisementManagement />}
        />
        <Route path="campaigns" element={<CampaignManagement />} />
        <Route path="analytics" element={<CompanyAnalytics />} />
        <Route path="settings" element={<CompanySettings />} />
        <Route path="content" element={<CompanyUpcomingContent />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;