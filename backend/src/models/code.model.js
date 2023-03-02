const { DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');
const { db } = require('../utils/database');

const Code = db.define('code', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => {
            return uuid();
        },
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = { Code };
