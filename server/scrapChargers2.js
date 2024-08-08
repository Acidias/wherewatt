require('dotenv').config();

const axios = require('axios');
const { MongoClient } = require('mongodb');

// NREL API key
const API_KEY = '1ewfg4nWdtvVbDXNAYMqH39mu9YWrJrfaLyjP1CA'; // Replace with your actual NREL API key
const BASE_URL = 'https://developer.nrel.gov/api/alt-fuel-stations/v1.json';

// MongoDB connection details
const MONGO_URI = 'mongodb+srv://dmisi98:Afn2Wr2jdmCXYRgd@cluster0.w3tdfbl.mongodb.net/';
const DATABASE_NAME = 'test';
const COLLECTION_NAME = 'ev_chargers2'; // Replace with your collection name

// Define area coordinates and radius in miles
const LATITUDE = 37.7749;
const LONGITUDE = -122.4194;
const RADIUS = 62.1371; // Convert 100 kilometers to miles

// Fetch EV charger data from NREL API
async function fetchChargeData() {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                api_key: API_KEY,
                fuel_type: 'ELEC',
                latitude: LATITUDE,
                longitude: LONGITUDE,
                radius: RADIUS, // Use radius in miles
                limit: 200, // Consider reducing the limit for test purposes
            },
        });

        // Map the response data to match the expected structure
        const chargers = response.data.fuel_stations.map((station) => ({
            station_name: station.station_name,
            station_address: station.street_address,
            city: station.city,
            state: station.state,
            zip: station.zip,
            country: station.country,
            latitude: station.latitude,
            longitude: station.longitude,
            ev_network: station.ev_network || 'None',
            ev_connector_types: station.ev_connector_types || [],
            ev_dc_fast_count: station.ev_dc_fast_count || 0,
            ev_level1_evse_num: station.ev_level1_evse_num || 0,
            ev_level2_evse_num: station.ev_level2_evse_num || 0,
            station_phone: station.station_phone || null,
            station_hours: station.access_days_time || null,
            access_code: station.access_code || null,
            price_info: station.ev_pricing || 'Not provided', // Hypothetical field for pricing
        }));

        return chargers;
    } catch (error) {
        console.error('Error fetching data from NREL API:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Save EV charger data to MongoDB
async function saveToMongoDB(data) {
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // Insert the data into the collection
        const result = await collection.insertMany(data);
        console.log(`Inserted ${result.insertedCount} documents into ${COLLECTION_NAME} collection`);
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

// Main function to orchestrate the process
async function main() {
    try {
        const chargeData = await fetchChargeData();
        await saveToMongoDB(chargeData);
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

main();
