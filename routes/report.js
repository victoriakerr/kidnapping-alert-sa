const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const MissingPerson = require('../models/MissingPerson');
const sendAlertSMS = require('../services/sms');
const geocodeAddress = require('../services/geocode');

router.post(
    '/',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('surname').trim().notEmpty().withMessage('Surname is required'),
        body('age').isInt({ min: 0 }).withMessage('Age must be a valid number'),
        body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender is invalid'),
        body('lastSeenLocation').notEmpty().withMessage('Last seen location required'),
        body('contactNumber').trim().notEmpty().withMessage('Contact number required'),
        body('description').trim().notEmpty().withMessage('Description is required'),
        
        body('photoUrl').optional().isString(),
        body('faceDescriptor').optional().custom((val) => Array.isArray(val)).withMessage('faceDescriptor must be an array'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const { name, surname, age, gender, photoUrl, lastSeenLocation, contactNumber, description } = req.body;
            const faceDescriptor = Array.isArray(req.body.faceDescriptor) ? req.body.faceDescriptor : [];

            const geo = await geocodeAddress(lastSeenLocation);

            const report = new MissingPerson({
                name,
                surname,
                age,
                gender,
                photoUrl: photoUrl || null,
                lastSeenLocation,
                contactNumber,
                description,
                geolocation: geo || undefined,
                faceDescriptor,
            });
            const saved = await report.save();

            const sms = await sendAlertSMS(
                `Missing Alert: ${name} ${surname}, ${age} years old, ${gender}. Last seen at ${lastSeenLocation}. Description: ${description}`,
                lastSeenLocation
            );

            saved.smsResult = sms;
            await saved.save();

            return res.status(201).json({ success: true, message: 'Report submitted', data: saved });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: 'server error' });
        }
    }
);

router.get('/', async (_req, res) => {
    try {
        const reports = await MissingPerson.find().sort({ reportedAt: -1 });
        return res.status(200).json({ success: true, data: reports });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: 'server error while fetching reports' });
    }

});

module.exports = router;
