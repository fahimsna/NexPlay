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

import UpcomingContent from "../pages/UpcomingContent";

import Advertise from "../pages/Advertise";
import UpcomingReleaseCalendar from "../pages/UpcomingReleaseCalendar";
import TopRated from "../pages/TopRated";
import UserProfile from "../pages/user/UserProfile";
import SearchResults from "../pages/SearchResults";
import Notifications from "../pages/Notifications";

import CompanySettings from "../pages/company/CompanySettings";


import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import CompanyDashboard from "../pages/company/CompanyDashboard";
import CompanyProfile from "../pages/company/CompanyProfile";

import CompanySettings from "../pages/company/CompanySettings";
import CampaignManagement from "../pages/company/CampaignManagement";
import AdvertisementManagement from "../pages/company/AdvertisementManagement";
import Analytics from "../pages/company/Analytics";
import CompanyUpcomingContent from "../pages/company/UpcomingContent";

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
          <Route path="/upcoming" element={<UpcomingContent />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Company Dashboard */}
        <Route path="/company" element={<CompanyDashboardLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="settings" element={<CompanySettings />} />
          <Route path="campaigns" element={<CampaignManagement />} />
          <Route
            path="advertisements"
            element={<AdvertisementManagement />}
          />
          <Route path="analytics" element={<Analytics />} />
          <Route
            path="upcoming-content"
            element={<CompanyUpcomingContent />}
          />
        </Route>
      </Routes>
    </BrowserRouter>

import AdvertisementManagement from "../pages/company/AdvertisementManagement";
import CampaignManagement from "../pages/company/CampaignManagement";
import CompanyAnalytics from "../pages/company/CompanyAnalytics";
import CompanyUpcomingContent from "../pages/company/CompanyUpcomingContent";

import CompanyDashboardLayout from "../layouts/CompanyDashboardLayout";
import PublicLayout from "../layouts/PublicLayout";

import ProtectedRoute from "./ProtectedRoute";
import Sports from "../pages/Sports";
import SportsLeagueDetails from "../pages/SportsLeagueDetails";
import SportsTeamDetails from "../pages/SportsTeamDetails";
import SportsMatchDetails from "../pages/SportsMatchDetails";

// Sprint 1: Admin Dashboard + Company Verification
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminCompanyVerification from "../pages/admin/AdminCompanyVerification";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminActivityLog from "../pages/admin/AdminActivityLog";
import CommentModeration from "../pages/admin/CommentModeration";
import CompanyVerificationGate from "../components/company/CompanyVerificationGate";

// Sprint 4: Ratings & Reviews
import MyReviews from "../pages/user/MyReviews";

function AppRoutes() {
  return (
    <Routes>
      {/* ==
          PUBLIC WEBSITE
      == */}

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

        {/* Public Advertising Page */}
        <Route path="/advertise" element={<Advertise />} />

        <Route path="/sports" element={<Sports />} />

        {/* Global search - movies, series, and sports teams/leagues */}
        <Route path="/search" element={<SearchResults />} />

        <Route path="/sports/league/:id" element={<SportsLeagueDetails />} />

        <Route path="/sports/team/:id" element={<SportsTeamDetails />} />

        <Route path="/sports/match/:id" element={<SportsMatchDetails />} />

        {/* Sprint 2: Upcoming Release Calendar */}
        <Route path="/calendar" element={<UpcomingReleaseCalendar />} />

        <Route path="/upcoming" element={<UpcomingReleaseCalendar />} />

        {/* Sprint 4: Top Rated Content */}
        <Route path="/top-rated" element={<TopRated />} />

        {/* Notifications: new releases + live sports */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Sprint 4: My Reviews (any logged-in user) */}
        <Route
          path="/my-reviews"
          element={
            <ProtectedRoute>
              <MyReviews />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ==
          AUTH
      == */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* ==
          COMPANY DASHBOARD
      == */}

      <Route
        path="/company"
        element={
          <ProtectedRoute allowedRoles={["company"]}>
            <CompanyVerificationGate>
              <CompanyDashboardLayout />
            </CompanyVerificationGate>
          </ProtectedRoute>
        }
      >
        <Route index element={<CompanyDashboard />} />

        <Route path="profile" element={<CompanyProfile />} />

        <Route path="advertisements" element={<AdvertisementManagement />} />

        <Route path="campaigns" element={<CampaignManagement />} />

        <Route path="analytics" element={<CompanyAnalytics />} />

        <Route path="settings" element={<CompanySettings />} />

        <Route path="content" element={<CompanyUpcomingContent />} />
      </Route>

      {/* ==
          ADMIN DASHBOARD
          Sprint 1
      == */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        <Route path="companies" element={<AdminCompanyVerification />} />

        <Route path="users" element={<AdminUsers />} />

        <Route path="activity-log" element={<AdminActivityLog />} />
        <Route path="discussion-moderation" element={<CommentModeration />} />
      </Route>
    </Routes>

  );
}

export default AppRoutes;
