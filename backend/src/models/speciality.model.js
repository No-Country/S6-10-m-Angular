const { DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');
const { db } = require('../utils/database');

const Speciality = db.define('speciality', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = { Speciality };
