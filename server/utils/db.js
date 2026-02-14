import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server root
dotenv.config({ path: path.join(__dirname, '../.env') });

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
    })
    : new Sequelize(
        process.env.DB_NAME || 'anubhav_traders',
        process.env.DB_USER || 'postgres',
        process.env.DB_PASSWORD || 'postgres',
        {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'postgres',
            logging: false,
        }
    );

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connection Established Successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
};

export default sequelize;
