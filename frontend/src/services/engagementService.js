import axios from "axios";


const API = "http://localhost:8000/api/engagement";


export async function getUserEngagement(userId) {

  console.log("SERVICE USER ID:", userId);


  if (!userId) {
    throw new Error("User ID missing");
  }


  const token = localStorage.getItem("token");


  const response = await axios.get(
    `${API}/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  return response.data;

}