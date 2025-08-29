const mongoose = require('mongoose');


const missingPersonSchema = new mongoose.Schema({
name: { type: String, required: true, trim: true },
surname: { type: String, required: true, trim: true },
age: { type: Number, required: true, min: 0 },
gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
lastSeenLocation: { type: String, required: true },
contactNumber: { type: String, required: true },
description: { type: String, required:true},
photoUrl: { type: String, default: null},

status: { type: String, enum: ['Missing', 'Found', 'Deceased'], default: 'Missing' },


geolocation: {
lat: { type: Number },
lng: { type: Number },
},

faceDescriptor: { type: [Number], default: [] },

smsResult: {
messageId: { type: String },
accepted: { type: Number },
failed: { type: Number },
raw: { type: Object },
},


reportedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('MissingPerson', missingPersonSchema);
