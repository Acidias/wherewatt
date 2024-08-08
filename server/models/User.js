const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['homeowner', 'driver'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    phone: String,
    profileImage: String,
    chargers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Charger'
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
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

userSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
