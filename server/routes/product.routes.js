import express from 'express';
import { Product } from '../models/index.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

// Get single product
router.get('/:id', async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
});

// Admin: Create product
router.post('/', async (req, res) => {
    // Add auth middleware check here in prod
    const product = await Product.create(req.body);
    res.status(201).json(product);
});

// Admin: Update product
router.put('/:id', async (req, res) => {
    await Product.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Updated' });
});

export default router;
