import { Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Details from "./pages/Details";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import About from "./pages/About";
import Partner from "./pages/Partner";
import Contact from "./pages/Contact";

// Company pages
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyProfile from "./pages/CompanyProfile";
import Analytics from "./pages/Analytics";
import CompanySettings from "./pages/CompanySettings";

// Campaign and advertisement pages
import CampaignManagement from "./pages/CampaignManagement";
import AdvertisementManagement from "./pages/AdvertisementManagement";

// Shared component
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/contact" element={<Contact />} />

        {/* Company routes */}
        <Route
          path="/company/dashboard"
          element={<CompanyDashboard />}
        />

        <Route
          path="/company/profile"
          element={<CompanyProfile />}
        />

        <Route
          path="/company/analytics"
          element={<Analytics />}
        />

        <Route
          path="/company/settings"
          element={<CompanySettings />}
        />

        {/* Sidebar management pages */}
        <Route
          path="/company/campaigns"
          element={<CampaignManagement />}
        />

        <Route
          path="/company/advertisements"
          element={<AdvertisementManagement />}
        />

        {/* Dashboard count-card pages */}
        <Route
          path="/company/campaign-list"
          element={<CampaignManagement />}
        />

        <Route
          path="/company/advertisement-list"
          element={<AdvertisementManagement />}
        />
      </Routes>
    </>
  );
}

export default App;