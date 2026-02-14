import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Product = sequelize.define('Product', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    retail_price: { type: DataTypes.FLOAT },
    bulk_price: { type: DataTypes.FLOAT },
    moq: { type: DataTypes.INTEGER, defaultValue: 1 },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    image_url: { type: DataTypes.STRING },
    source_url: { type: DataTypes.STRING },
    last_synced_at: { type: DataTypes.DATE }
}, {
    tableName: 'products',
    indexes: [{ unique: true, fields: ['name', 'BrandId'] }]
});

export default Product;
