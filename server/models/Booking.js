const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    chargerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Charger',
        required: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    homeownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingTime: {
        startTime: Date,
        endTime: Date
    },
    totalPrice: Number,
    paymentStatus: {
        type: String,
        enum: ['completed', 'pending', 'failed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
