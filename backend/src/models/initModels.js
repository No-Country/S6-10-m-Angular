// Models
const { User } = require('./user.model');
const { Doctor } = require('./doctor.model');
const { Appointment } = require('./appointment.model');
const { Favorite } = require('./favorite.model');
const { Schedule } = require('./schedule.model');
const { Sede } = require('./sede.model');
const { Speciality } = require('./speciality.model');
const { History } = require('./history.model');

/**
 *  only when <> userId (userId is what sequelize is looking for)
 * User.hasMany(Product, { foreignKey: 'user_id' });
 */

const initModels = () => {
    // one user <–—> many favorite
    User.hasMany(Favorite);
    Favorite.belongsTo(User);

    // one user <---> many appointment
    User.hasMany(Appointment);
    Appointment.belongsTo(User);

    // one doctor <–—> many favorite
    Doctor.hasMany(Favorite);
    Favorite.belongsTo(Doctor);

    // one appointment <---> one schedule
    Appointment.hasOne(Schedule);
    Schedule.belongsTo(Appointment);

    // one Doctor <---> many Schedule
    Doctor.hasMany(Schedule);
    Schedule.belongsTo(Doctor);

    // one appointment <---> one history
    Appointment.hasOne(History);
    History.belongsTo(Appointment);

    // one Speciality <---> many Doctor
    Speciality.hasMany(Doctor);
    Doctor.belongsTo(Speciality);

    // one Sede <---> many Doctor
    Sede.hasMany(Doctor);
    Doctor.belongsTo(Sede);
};

module.exports = { initModels };
