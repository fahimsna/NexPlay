import { useState } from "react";
import AdvertisementManagement from "./pages/AdvertisementManagement.jsx";
import CampaignManagement from "./pages/CampaignManagement.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("advertisement");

  return (
    <div>
      <div
        style={{
          background: "#1B1D22",
          padding: "20px",
          display: "flex",
          gap: "15px",
        }}
      >
        <button
          type="button"
          onClick={() => setCurrentPage("advertisement")}
          style={{
            background:
              currentPage === "advertisement" ? "#D4A017" : "#2A2D34",
            color: "white",
            border: "1px solid rgba(255,255,255,.08)",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Advertisement
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage("campaign")}
          style={{
            background: currentPage === "campaign" ? "#D4A017" : "#2A2D34",
            color: "white",
            border: "1px solid rgba(255,255,255,.08)",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Campaign
        </button>
      </div>

      {currentPage === "advertisement" ? (
        <AdvertisementManagement />
      ) : (
        <CampaignManagement />
      )}
    </div>
  );
}

export default App;