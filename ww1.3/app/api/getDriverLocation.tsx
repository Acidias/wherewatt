const API_ENDPOINT = "https://api.dev.ez-taxi.uk/api/location";

const getDriverLocationApi = async (driverId: number, token: string) => {

     const URL = `${API_ENDPOINT}/${driverId}`;
     console.log("URL: ", URL);
     try {
          const response = await fetch(`${API_ENDPOINT}/${driverId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-access-token": token,
            }
          });
       
          if (!response.ok) {
            console.error("HTTP Error:", response.status, response.statusText);
            throw new Error("Failed to fetch job details");
          }
          const data = await response.json();
          const latitude = data.lastloc[0].latitude;
          const longitude = data.lastloc[0].longitude;

          console.log("Latitude:", latitude, "Longitude:", longitude);
          return { latitude, longitude };
       } catch (error) {
          console.error("Error fetching job details:", error);
       }
       
   };
   
   export default getDriverLocationApi;