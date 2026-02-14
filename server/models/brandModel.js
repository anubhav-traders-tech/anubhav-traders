import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Brand = sequelize.define('Brand', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    logo: { type: DataTypes.STRING }
}, { tableName: 'brands' });

export default Brand;
