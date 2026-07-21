import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Details from "./pages/Details";
import Movies from "./pages/Movies";
import Series from "./pages/Series";

// Company Pages
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyProfile from "./pages/CompanyProfile";
import Analytics from "./pages/Analytics";
import CompanySettings from "./pages/CompanySettings";
import AdvertisementManagement from "./pages/AdvertisementManagement";
import CampaignManagement from "./pages/CampaignManagement";

// Other Pages
import About from "./pages/About";
import Partner from "./pages/Partner";
import Contact from "./pages/Contact";

// Scroll
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/contact" element={<Contact />} />

        {/* Company Routes */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route
          path="/company/advertisements"
          element={<AdvertisementManagement />}
        />
        <Route path="/company/campaigns" element={<CampaignManagement />} />
        <Route path="/company/analytics" element={<Analytics />} />
        <Route path="/company/settings" element={<CompanySettings />} />
      </Routes>
    </>
  );
}

export default App;