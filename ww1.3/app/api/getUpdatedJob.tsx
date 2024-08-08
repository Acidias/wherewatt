const API_ENDPOINT = process.env.URL;
import { JobType } from "../types/types";


export const getUpdatedJob = async (jobId: number, accessToken: string): Promise<JobType> => {
  const response = await fetch(`${API_ENDPOINT}/api/job/${jobId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-access-token": accessToken,
    }
  });
  
  //console.log("Response from updateed Job =====>", response.json());
  if (!response.ok) {
    console.error("HTTP Error:", response.status, response.statusText);
    throw new Error("Failed to fetch job details");
  }
  const data = await response.json();
  //console.log("Job details in UPDATE------:", data);
  return data;
};
   
   
   export default getUpdatedJob;