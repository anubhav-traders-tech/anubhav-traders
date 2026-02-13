import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, companyName, gst } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const approved = role === 'b2b' ? false : true; // B2B needs approval
        const user = await User.create({ name, email, password: hashedPassword, role, companyName, gst, approved });
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        if (user.role === 'b2b' && !user.approved) {
            return res.status(403).json({ error: 'Account pending approval' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
