const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');
const { uuid } = require('uuidv4');

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
