import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import CompanyForm from "../components/company/CompanyForm";
import { getCompanies } from "../services/companyService";

function CompanyProfile() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const data = await getCompanies();

      if (data.length > 0) {
        setCompany(data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-white">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <CompanyForm company={company} />
    </DashboardLayout>
  );
}

export default CompanyProfile;
