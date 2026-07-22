import companyService from "../services/companyService";

const companyController = {
  fetchCompany: async () => {
    try {
      const data = await companyService.getCompany();

      return data;
    } catch (error) {
      console.error("Fetch company error:", error);

      throw error;
    }
  },

  createCompany: async (companyData) => {
    try {
      const data = await companyService.createCompany(companyData);

      return data;
    } catch (error) {
      console.error("Create company error:", error);

      throw error;
    }
  },

  updateCompany: async (id, companyData) => {
    try {
      const data = await companyService.updateCompany(id, companyData);

      return data;
    } catch (error) {
      console.error("Update company error:", error);

      throw error;
    }
  },
};

export default companyController;
