const express = require('express');
const PublicCharger = require('../models/PublicCharger');

const router = express.Router();

// GET /api/publicchargers - Get all public chargers
router.get('/', async (req, res) => {
    console.log('Fetching public chargers...');
    try {
        const chargers = await PublicCharger.find({});
        console.log(`Fetched ${chargers.length} public chargers`);
        res.json(chargers);
    } catch (err) {
        console.error('Error fetching public chargers:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
