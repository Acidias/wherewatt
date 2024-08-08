const url = process.env.URL;
import { UserType } from "../types/types";

const updateProfile = async (user: UserType) => {
     try {
          const response = await fetch(`${url}/api/auth/profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-access-token": user.accessToken,
            }
          });
          if (!response.ok) {
            console.error("HTTP Error:", response.status, response.statusText);
            throw new Error("Failed to fetch job details");
          }

          const jobDetails = await response.json();
          return jobDetails;
       } catch (error) {
          console.error("Error fetching job details:", error);
       }

   };

   export default updateProfile;