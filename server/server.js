const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');

const profileRoutes = require('./routes/profile');
const publicChargersRoutes = require('./routes/publicChargers');

// Create an Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Use the auth routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/publicchargers', publicChargersRoutes);

// Define a test route
app.get('/', (req, res) => {
    console.log("API is running");
    res.send('EV Charger App API is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
