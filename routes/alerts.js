const express = require("express");
const router = express.Router();
const MissingPerson = require("../models/MissingPerson");
const { data } = require("react-router-dom");

router.get("/", async (_req, res) => {
  try {
    const alerts = await MissingPerson.find().sort({ reportedAt: -1});
    res.json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch alerts' });
  }
});

module.exports = router;
