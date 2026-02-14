import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    retail_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    bulk_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    source_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_synced_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            unique: true,
            fields: ['name', 'brand']
        }
    ]
});

export default Product;
