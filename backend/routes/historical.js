// backend/routes/historical.js
const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
    const range = req.query.range || 24;
    db.all("SELECT time, batteryLevel FROM historical WHERE time >= datetime('now', '-" + range + " hours')", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

module.exports = router;
