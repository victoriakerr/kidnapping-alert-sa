const express = require('express');
const router = express.Router();
const MissingPerson = require('../models/MissingPerson');

function distance(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return Number.POSITIVE_INFINITY;
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2;
  return Math.sqrt(sum);
}

router.post('/', async (req, res) => {
  try {
    const { faceDescriptor, maxResults = 5 } = req.body;
    if (!Array.isArray(faceDescriptor) || faceDescriptor.length < 64) {
      return res.status(400).json({ success: false, error: 'faceDescriptor array required' });
    }

    const candidates = await MissingPerson.find({ faceDescriptor: { $exists: true, $ne: [] } });

    const matches = candidates.map(p => ({
      person: p,
      score: distance(faceDescriptor, p.faceDescriptor),
    })).sort((a, b) => a.score - b.score).slice(0, Math.min(10, maxResults));

    const withConfidence = matches.map(m => ({
      person: m.person,
      score: m.score,
      confidence: Math.max(0, 1 - (m.score / 1.5)),
    }));

    return res.json({ success: true, data: withConfidence });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Error during facial recognition search' });
  }
});

module.exports = router;