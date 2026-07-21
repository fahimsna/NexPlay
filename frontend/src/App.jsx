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

// Scroll
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Partner from "./pages/Partner";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* ===========================
            Public Routes
        =========================== */}

        <Route path="/" element={<Home />} />

        <Route path="/browse" element={<Browse />} />

        <Route path="/movies" element={<Movies />} />

        <Route path="/series" element={<Series />} />

        <Route path="/details/:id" element={<Details />} />

        {/* ===========================
            Company Routes
        =========================== */}

        <Route path="/company/dashboard" element={<CompanyDashboard />} />

        <Route path="/company/profile" element={<CompanyProfile />} />

        <Route path="/company/analytics" element={<Analytics />} />

        <Route path="/company/settings" element={<CompanySettings />} />
        <Route path="/about" element={<About />} />

        <Route path="/partner" element={<Partner />} />

        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
