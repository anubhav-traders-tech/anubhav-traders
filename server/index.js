import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './models/index.js';
import ecommerceRoutes from './routes/ecommerce.routes.js';
import orderRoutes from './routes/order.routes.js';
import adminSyncRoutes from './routes/adminSync.routes.js';
import './cron/syncCron.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Content serving
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Routes
app.use('/api', ecommerceRoutes);
app.use('/api', orderRoutes);
app.use('/api/admin', adminSyncRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('DB Connection Failed:', err));
