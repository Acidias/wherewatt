const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
     console.log("signup");
    try {
        const { name, email, password, userType } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const user = new User({
            name,
            email,
            passwordHash,
            userType
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

// Login route
router.post('/login', async (req, res) => {
     console.log("login");
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = user.isValidPassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
});

module.exports = router;
