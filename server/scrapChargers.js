require('dotenv').config();

const axios = require('axios');
const { MongoClient } = require('mongodb');

// Open Charge Map API key
const API_KEY = '88a048a2-4089-420b-99fc-752f1a348802';
const BASE_URL = 'https://api.openchargemap.io/v3/poi/';

// MongoDB connection details
const MONGO_URI = 'mongodb+srv://dmisi98:Afn2Wr2jdmCXYRgd@cluster0.w3tdfbl.mongodb.net/';
const DATABASE_NAME = 'test';
const COLLECTION_NAME = 'chargestations'; // Replace with your collection name

// Define Bay Area coordinates and radius
const LATITUDE = 37.7749;
const LONGITUDE = -122.4194;
const RADIUS = 100; // Radius in kilometers

async function fetchChargeData() {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                output: 'json',
                latitude: LATITUDE,
                longitude: LONGITUDE,
                distance: RADIUS, // Search within this radius
                distanceunit: 'KM', // Use kilometers
                maxresults: 2000, // Number of results to fetch
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data from Open Charge Map:', error);
        throw error;
    }
}

async function saveToMongoDB(data) {
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(DATABASE_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const result = await collection.insertMany(data);
        console.log(`Inserted ${result.insertedCount} documents into ${COLLECTION_NAME} collection`);
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

async function main() {
    try {
        const chargeData = await fetchChargeData();
        await saveToMongoDB(chargeData);
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

main();
