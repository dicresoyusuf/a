const express = require('express');
const db = require('../database');
const { authMiddleware } = require('./auth');

const router = express.Router();

// Get all settings
router.get('/', (req, res) => {
    const settings = db.prepare('SELECT key, value FROM settings').all();
    const result = {};
    settings.forEach(s => result[s.key] = s.value);
    res.json(result);
});

// Update setting (protected)
router.put('/:key', authMiddleware, (req, res) => {
    try {
        const { value } = req.body;
        const existing = db.prepare('SELECT id FROM settings WHERE key = ?').get(req.params.key);

        if (existing) {
            db.prepare('UPDATE settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?').run(value, req.params.key);
        } else {
            db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(req.params.key, value);
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
