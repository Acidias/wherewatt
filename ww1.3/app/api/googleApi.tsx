const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getCoordinatesFromAddress = async (address: string) => {
     console.log("apiKey", GOOGLE_MAPS_API_KEY);
     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?new_forward_geocoder=true&address=${encodeURIComponent(address)}&key=AIzaSyDYbzOINz_uJlEpYQYr80Mi7jLe75gmLyY`;
     console.log("apiUrl", apiUrl);
     const response = await fetch(apiUrl);
     console.log("Response", response);
     const data = await response.json();
     console.log("Data", data);
     if (data.results && data.results.length > 0) {
       const location = data.results[0].geometry.location;
       return location; // { lat, lng }
     } else {
       return null; // Address not found or other error
     }
};

export default getCoordinatesFromAddress;