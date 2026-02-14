import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const ImportLog = sequelize.define('ImportLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_detected: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    inserted_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    duplicate_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    failed_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    import_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'catalog_import_logs',
    timestamps: false,
});

export default ImportLog;
