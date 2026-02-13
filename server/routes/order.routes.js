import express from 'express';
import { Order, OrderItem, Product } from '../models/index.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

router.post('/', authenticate, async (req, res) => {
    try {
        const { items, type } = req.body; // items: [{productId, quantity}]
        let total = 0;

        // Calculate total
        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            const price = type === 'bulk' ? product.priceBulk : product.priceRetail;
            total += price * item.quantity;
        }

        const order = await Order.create({ userId: req.user.id, total, type, status: 'pending' });

        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            const price = type === 'bulk' ? product.priceBulk : product.priceRetail;
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price
            });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/my-orders', authenticate, async (req, res) => {
    const orders = await Order.findAll({
        where: { userId: req.user.id },
        include: [OrderItem]
    });
    res.json(orders);
});

export default router;
