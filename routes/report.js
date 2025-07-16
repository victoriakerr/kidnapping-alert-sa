const express = require('express');
const router = express.Router();
const MissingPerson = require('../models/MissingPerson');
const sendAlertSMS = require('../services/sms');

router.post('/', async (req, res) => {
    try {
        const { name, surname, age, gender, photoUrl, lastSeenLocation, contactNumber } = req.body;

        const newReport = new MissingPerson({
            name,
            surname,
            age,
            gender,
            photoUrl,
            lastSeenLocation,
            contactNumber,
        });

        const saved = await newReport.save();

        await sendAlertSMS(`Missing Alert: ${name}, last seen at ${lastSeenLocation}.`, lastSeenLocation);
        res.status(201).json({ message: 'Report submitted', data: saved });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;