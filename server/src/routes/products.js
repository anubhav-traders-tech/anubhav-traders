import express from 'express';
import { Product, Category } from '../models/index.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public: Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll({ include: Category });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Create Product
router.post('/', auth, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Admin: Update Product
router.put('/:id', auth, async (req, res) => {
    try {
        await Product.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Admin: Delete Product
router.delete('/:id', auth, async (req, res) => {
    try {
        await Product.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
