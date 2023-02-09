const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');
const { uuid } = require('uuidv4');

const Favorite = db.define('favorite', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = { Favorite };
