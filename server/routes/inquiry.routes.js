import express from 'express';
import { Inquiry } from '../models/index.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public: Submit Inquiry
router.post('/', async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);
        res.status(201).json({ message: 'Inquiry received', id: inquiry.id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Admin: Get all inquiries
router.get('/', auth, async (req, res) => {
    try {
        const inquiries = await Inquiry.findAll({ order: [['createdAt', 'DESC']] });
        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Update Status
router.patch('/:id/status', auth, async (req, res) => {
    try {
        await Inquiry.update({ status: req.body.status }, { where: { id: req.params.id } });
        res.json({ message: 'Status updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
