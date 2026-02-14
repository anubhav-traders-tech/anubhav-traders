import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Category = sequelize.define('Category', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'categories',
    indexes: [{ unique: true, fields: ['name', 'BrandId'] }]
});

export default Category;
