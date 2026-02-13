import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'admin' }
});

const Category = sequelize.define('Category', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT }
});

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price_range: { type: DataTypes.STRING }, // e.g. "500-700 per unit"
    min_order_qty: { type: DataTypes.INTEGER, defaultValue: 100 },
    stock_status: { type: DataTypes.ENUM('In Stock', 'Low Stock', 'Out of Stock'), defaultValue: 'In Stock' },
    image_url: { type: DataTypes.STRING }
});

const Inquiry = sequelize.define('Inquiry', {
    customer_name: { type: DataTypes.STRING, allowNull: false },
    company_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('New', 'Contacted', 'Closed'), defaultValue: 'New' },
    items_interest: { type: DataTypes.JSONB } // Array of product IDs or names
});

// Relationships
Category.hasMany(Product);
Product.belongsTo(Category);

export { sequelize, User, Category, Product, Inquiry };
