import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Invoice = sequelize.define('Invoice', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    invoice_number: { type: DataTypes.STRING, unique: true, allowNull: false },
    pdf_path: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'invoices' });

export default Invoice;
