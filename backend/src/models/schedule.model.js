const { DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');
const { db } = require('../utils/database');

const Schedule = db.define('schedule', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => {
            return uuid();
        },
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    hour: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'available',
    },
    office: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = { Schedule };
