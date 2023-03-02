const { DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');
const { db } = require('../utils/database');

const Speciality = db.define('speciality', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => {
            return uuid();
        },
        allowNull: false,
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
