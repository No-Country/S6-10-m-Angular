const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');
const { uuid } = require('uuidv4');

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
