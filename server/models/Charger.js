const mongoose = require('mongoose');

const chargerSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        street: String,
        city: String,
        state: String,
        zip: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    chargerType: String,
    powerOutput: String,
    availability: {
        startTime: String,
        endTime: String,
        days: [String]
    },
    pricePerHour: Number,
    status: {
        type: String,
        enum: ['available', 'booked', 'unavailable'],
        default: 'available'
    },
    ratings: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number,
        review: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Charger = mongoose.model('Charger', chargerSchema);

module.exports = Charger;
