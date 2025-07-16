const mongoose = require('mongoose');

const missingPersonSchema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    gender: String,
    photoUrl: String,
    lastSeenLocation: String,
    contactNumber: String,
    reportedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('MissingPerson', missingPersonSchema);
