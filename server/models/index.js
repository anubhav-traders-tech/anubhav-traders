import sequelize from '../utils/db.js';
import { DataTypes } from 'sequelize';
import Brand from './brandModel.js';
import Category from './categoryModel.js';
import Product from './productModel.js';
import Invoice from './invoiceModel.js';
import SyncLog from './syncLogModel.js';

// User Model
const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'b2b', 'b2c'), defaultValue: 'b2c' },
    companyName: { type: DataTypes.STRING },
    gst: { type: DataTypes.STRING },
    approved: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: 'users' });

// Order Model
const Order = sequelize.define('Order', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    total_amount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'shipped', 'completed', 'cancelled'), defaultValue: 'pending' },
    order_type: { type: DataTypes.ENUM('b2c', 'b2b'), defaultValue: 'b2c' }
}, { tableName: 'orders' });

// OrderItem Model
const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
}, { tableName: 'order_items' });

// Relationships
Brand.hasMany(Category);
Category.belongsTo(Brand);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Category.hasMany(Product);
Product.belongsTo(Category);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Order.hasOne(Invoice);
Invoice.belongsTo(Order);

export { sequelize, User, Brand, Category, Product, Order, OrderItem, Invoice, SyncLog };
