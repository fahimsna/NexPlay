import axios from "../api/axiosInstance";


const COMPANY_API = "/company";


// GET MY COMPANY
export const getMyCompany = async () => {

    const response = await axios.get(
        `${COMPANY_API}/profile`
    );

    return response.data;
};


// UPDATE COMPANY
export const updateMyCompany = async (data) => {

    const response = await axios.put(
        `${COMPANY_API}/profile`,
        data
    );

    return response.data;
};