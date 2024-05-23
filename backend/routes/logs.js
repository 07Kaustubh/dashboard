// backend/routes/logs.js
const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
    db.all("SELECT log FROM logs", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows.map(row => row.log));
    });
});

module.exports = router;
