const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, location } = req.body;

    console.log("SOS Triggered:", { message, location });

    res.json({ success: true, message: "SOS triggered successfully" });
  } catch (error) {
    console.error("SOS error:", error);
    res.status(500).json({ error: "Failed to trigger SOS" });
  }
});

module.exports = router;
