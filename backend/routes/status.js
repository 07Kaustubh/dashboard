// backend/routes/status.js
const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
    db.get("SELECT batteryLevel, status FROM status", (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(row);
    });
});

module.exports = router;
