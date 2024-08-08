import { UserType, LocationType } from "../types/types";

const url = process.env.URL;

const putLocation = async (
     user: UserType, 
     location: LocationType
 ): Promise<any> => {
     try {
         const response = await fetch(url + "/api/auth/status", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
                 "x-access-token": user!.accessToken,
             },
             body: JSON.stringify({
                location: {
                 lat: location.lat,
                 lng: location.lng,
                }
             }),
         });
         if (response.ok) {
            console.log("SendLocation Successul");
         } else {
            console.error("Response:", response.text);
         }
             return response;
     } catch (error) {
        console.error(JSON.stringify(error, null, 2));
        throw error;
     }
 };
 
 export { putLocation };
 