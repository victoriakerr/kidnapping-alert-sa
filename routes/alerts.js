const express = require("express");
const router = express.Router();
const MissingPerson = require("../models/MissingPerson");

router.get("/", async (req, res) => {
  try {
    const alerts = await MissingPerson.find().sort({ reportedAt: -1});
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

module.exports = router;
