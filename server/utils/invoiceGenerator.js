import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INVOICE_DIR = path.join(__dirname, '../../uploads/invoices');
if (!fs.existsSync(INVOICE_DIR)) {
    fs.mkdirSync(INVOICE_DIR, { recursive: true });
}

export const generateInvoice = async (order, items) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const filename = `invoice_${order.id}.pdf`;
        const filePath = path.join(INVOICE_DIR, filename);
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        // Header
        doc.fontSize(20).text('ANUBHAV TRADERS', { align: 'center' });
        doc.fontSize(10).text('GSTIN: 07AAAAA0000A1Z5 (Sample)', { align: 'center' });
        doc.moveDown();

        // Order Info
        doc.fontSize(12).text(`Invoice Number: INV-${order.id.toString().split('-')[0].toUpperCase()}`);
        doc.text(`Date: ${new Date().toLocaleDateString()}`);
        doc.text(`Order Type: ${order.order_type.toUpperCase()}`);
        doc.text(`Status: ${order.status.toUpperCase()}`);
        doc.moveDown();

        // Items Table
        doc.fontSize(12).text('Items:', { underline: true });
        doc.moveDown(0.5);

        items.forEach(item => {
            const productName = item.Product ? item.Product.name : 'Product';
            doc.fontSize(10).text(`${productName} x ${item.quantity} = ${item.price * item.quantity}`);
        });

        doc.moveDown();
        doc.fontSize(14).text(`Total Amount: INR ${order.total_amount}`, { align: 'right' });

        doc.end();

        stream.on('finish', () => resolve(`/uploads/invoices/${filename}`));
        stream.on('error', reject);
    });
};
