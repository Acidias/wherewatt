// api/createJob.tsx

const API_ENDPOINT = process.env.URL;
import { JobType } from "../types/types";


type CreateJobApiProps = {
  jobData: JobType;
  accessToken: string;
};

const createJobApi = async ({ jobData, accessToken }: CreateJobApiProps) => {
  console.log("jobData", jobData);
  console.log("accessToken", accessToken);
  try {
    console.log("Url:", API_ENDPOINT);
    const response = await fetch(API_ENDPOINT+`/api/job`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-access-token": accessToken,
      },
      body: JSON.stringify(jobData),
    });
    console.log("Response:", response);

    if (!response.ok) {
      throw new Error("Failed to create job");
    }

    const responseData = await response.json();
    return responseData;

  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export default createJobApi;
