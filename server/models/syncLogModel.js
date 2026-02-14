import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

const SyncLog = sequelize.define('SyncLog', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_found: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    inserted: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    updated: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    failed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    run_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'sync_logs',
    timestamps: false,
});

export default SyncLog;
