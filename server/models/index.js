import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'b2b', 'b2c'), defaultValue: 'b2c' },
    companyName: { type: DataTypes.STRING }, // For B2B
    gst: { type: DataTypes.STRING }, // For B2B
    approved: { type: DataTypes.BOOLEAN, defaultValue: false } // For B2B
});

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    category: { type: DataTypes.STRING },
    priceRetail: { type: DataTypes.FLOAT, allowNull: false },
    priceBulk: { type: DataTypes.FLOAT },
    moq: { type: DataTypes.INTEGER, defaultValue: 1 },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    imageUrl: { type: DataTypes.STRING }
});

const Order = sequelize.define('Order', {
    total: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'shipped', 'completed', 'cancelled'), defaultValue: 'pending' },
    type: { type: DataTypes.ENUM('retail', 'bulk'), defaultValue: 'retail' }
});

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

export { sequelize, User, Product, Order, OrderItem };
