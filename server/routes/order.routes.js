import express from 'express';
import { Order, OrderItem, Product, Invoice, sequelize } from '../models/index.js';
import { generateInvoice } from '../utils/invoiceGenerator.js';

const router = express.Router();

router.post('/checkout', async (req, res) => {
    const { items, userId, orderType } = req.body; // items: [{productId, quantity}]
    const t = await sequelize.transaction();

    try {
        let total = 0;
        const processedItems = [];

        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            if (!product) throw new Error(`Product ${item.productId} not found`);

            const price = orderType === 'b2b' ? (product.bulk_price || product.retail_price) : product.retail_price;
            total += price * item.quantity;

            processedItems.push({
                product,
                quantity: item.quantity,
                price
            });
        }

        const order = await Order.create({
            UserId: userId,
            total_amount: total,
            order_type: orderType,
            status: 'completed'
        }, { transaction: t });

        for (const pi of processedItems) {
            await OrderItem.create({
                OrderId: order.id,
                ProductId: pi.product.id,
                quantity: pi.quantity,
                price: pi.price
            }, { transaction: t });
        }

        const pdfPath = await generateInvoice(order, processedItems);

        await Invoice.create({
            OrderId: order.id,
            invoice_number: `INV-${order.id.toString().split('-')[0].toUpperCase()}`,
            pdf_path: pdfPath
        }, { transaction: t });

        await t.commit();
        res.status(201).json({ order, invoiceUrl: pdfPath });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
});

router.get('/b2b/orders/:userId', async (req, res) => {
    const orders = await Order.findAll({
        where: { UserId: req.params.userId, order_type: 'b2b' },
        include: [{ model: OrderItem, include: [Product] }, Invoice]
    });
    res.json(orders);
});

export default router;
