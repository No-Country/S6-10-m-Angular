const express = require('express');

const router = express.Router();

const {
    createAppointment,
    getAllAppointment,
    getAppointmentByUser,
    cancelAppointment,
} = require('../controllers/appointment.controller');

// const {
//     appointmentExists
// } = require('../middlewares/isAppointment')

const {
    protectToken,
    protectAdmin,
  } = require('../middlewares/users.middlewares');

const {
    validateAppointmentFields,
} = require('../validators/appointment.validator');


// Apply protectToken middleware
router.use(protectToken);

// routes:
router.get('/', getAllAppointment);
router.get('/:id', getAppointmentByUser);
router.post('/', validateAppointmentFields, createAppointment);
router.get('/cancel/:id', cancelAppointment);


module.exports = { AppointmentRouter: router };
