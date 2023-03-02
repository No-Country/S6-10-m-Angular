const { DataTypes } = require('sequelize');
const { v4: uuid } = require('uuid');
const { db } = require('../utils/database');

const Favorite = db.define('favorite', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => {
            return uuid();
        },
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = { Favorite };
