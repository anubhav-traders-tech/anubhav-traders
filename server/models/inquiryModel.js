import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Inquiry = sequelize.define('Inquiry', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    customer_name: { type: DataTypes.STRING, allowNull: false },
    company_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('New', 'Contacted', 'Closed'), defaultValue: 'New' },
    items_interest: { type: DataTypes.JSONB } // Array of product IDs or names
}, { tableName: 'inquiries' });

export default Inquiry;
