const express = require('express');
const authMiddleware = require('../authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Protected profile route
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
