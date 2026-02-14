import sequelize from '../utils/db.js';
import { DataTypes } from 'sequelize';
import Product from './productModel.js';
import ImportLog from './importLogModel.js';
import SyncLog from './syncLogModel.js';

// User Model
const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'b2b', 'b2c'), defaultValue: 'b2c' },
    companyName: { type: DataTypes.STRING }, // For B2B
    gst: { type: DataTypes.STRING }, // For B2B
    approved: { type: DataTypes.BOOLEAN, defaultValue: false } // For B2B
});

// Order Model
const Order = sequelize.define('Order', {
    total: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'shipped', 'completed', 'cancelled'), defaultValue: 'pending' },
    type: { type: DataTypes.ENUM('retail', 'bulk'), defaultValue: 'retail' }
});

// OrderItem Model
const OrderItem = sequelize.define('OrderItem', {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
});

// Relationships
User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

export { sequelize, User, Product, Order, OrderItem, ImportLog, SyncLog };
