const { DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');
const { db } = require('../utils/database');

const Appointment = db.define('appointment', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'sede',
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = { Appointment };
