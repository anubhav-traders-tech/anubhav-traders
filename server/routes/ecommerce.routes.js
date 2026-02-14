import express from 'express';
import { Brand, Category, Product, Order, OrderItem, User } from '../models/index.js';

const router = express.Router();

// GET all brands
router.get('/brands', async (req, res) => {
    const brands = await Brand.findAll();
    res.json(brands);
});

// GET brand by slug
router.get('/brands/:slug', async (req, res) => {
    const brand = await Brand.findOne({
        where: { slug: req.params.slug },
        include: [Category]
    });
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.json(brand);
});

// GET products by brand slug
router.get('/brands/:slug/products', async (req, res) => {
    const brand = await Brand.findOne({ where: { slug: req.params.slug } });
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    const products = await Product.findAll({ where: { BrandId: brand.id } });
    res.json(products);
});

// GET products by category slug (within a brand context usually)
router.get('/categories/:slug/products', async (req, res) => {
    const category = await Category.findOne({ where: { slug: req.params.slug } });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    const products = await Product.findAll({ where: { CategoryId: category.id } });
    res.json(products);
});

// GET single product by slug
router.get('/products/:slug', async (req, res) => {
    const product = await Product.findOne({
        where: { slug: req.params.slug },
        include: [Brand, Category]
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// B2B Products
router.get('/b2b/products', async (req, res) => {
    const products = await Product.findAll({ include: [Brand] });
    res.json(products);
});

export default router;
