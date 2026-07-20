import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home Pages
import Home from "./pages/Home";
import Browse from "./pages/Browse";

// Company Pages
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyProfile from "./pages/CompanyProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />

        {/* Company Routes */}
        <Route
          path="/company/dashboard"
          element={<CompanyDashboard />}
        />

        <Route
          path="/company/profile"
          element={<CompanyProfile />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;