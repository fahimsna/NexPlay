import CompanyDashboardLayout from "../../layouts/CompanyDashboardLayout";
import "./AdvertisementManagement.css";

function AdvertisementList() {
  let advertisements = [];

  try {
    advertisements = JSON.parse(
      localStorage.getItem("nexplayAdvertisements") || "[]",
    );
  } catch (error) {
    console.error("Could not read advertisements:", error);
  }

  return (
    <CompanyDashboardLayout>
      <div className="advertisement-page">
        <h1>Saved Advertisements</h1>

        <div className="advertisement-list">
          {advertisements.length === 0 ? (
            <p>No saved advertisements found.</p>
          ) : (
            advertisements.map((ad) => (
              <div className="advertisement-card" key={ad.id}>
                <h2>{ad.title}</h2>

                <p>
                  <strong>Start Date:</strong> {ad.startDate}
                </p>

                <p>
                  <strong>End Date:</strong> {ad.endDate}
                </p>

                <p>
                  <strong>Status:</strong> {ad.status}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </CompanyDashboardLayout>
  );
}

export default AdvertisementList;
