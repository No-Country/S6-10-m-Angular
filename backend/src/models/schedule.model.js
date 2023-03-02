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
        type: DataTypes.ENUM,
        values: 
            [
                '8:00 - 8:20',
                '8:20 - 8:40',
                '8:40 - 9:00',
                '9:00 - 9:20',
                '9:20 - 9:40',
                '9:40 - 10:00',
                '10:00 - 10:20',
                '10:20 - 10:40',
                '10:40 - 11:00',
                '11:00 - 11:20',
                '11:20 - 11:40',
                '11:40 - 12:00',
                '12:00 - 12:20',
                '12:20 - 12:40',
                '12:40 - 13:00',
                '14:00 - 14:20',
                '14:20 - 14:40',
                '14:40 - 15:00',
                '15:00 - 15:20',
                '15:20 - 15:40',
                '15:40 - 16:00',
                '16:00 - 16:20',
                '16:20 - 16:40',
                '16:40 - 17:00',
                '17:00 - 17:20',
                '17:20 - 17:40',
                '17:40 - 18:00',
                '18:00 - 18:20',
                '18:20 - 18:40',
                '18:40 - 19:00',
                '19:00 - 19:20',
                '19:20 - 19:40',
                '19:40 - 20:00'
            ],
        defaultValue: '8:00 - 8:20',
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: [
            'available',
            'canceled',
            'not available'
        ],
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
