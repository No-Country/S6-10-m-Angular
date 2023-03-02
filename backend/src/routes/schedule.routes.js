const express = require('express');

const router = express.Router();

const {
    createSchedule,
    deleteSchedule,
    updateSchedule,
    getAllSchedule,
    getScheduleByDoctorDate,
    getScheduleBySedeSpecialityDate,
} = require('../controllers/schedule.controller');

const {
    scheduleExists
} = require('../middlewares/isSchedule')

const {
    protectToken,
    protectAdmin,
  } = require('../middlewares/users.middlewares');

const {
    validateScheduleFields,
} = require('../validators/schedule.validator');


// Apply protectToken middleware
router.use(protectToken);

// routes:
router.get('/', getAllSchedule);
router.post('/', validateScheduleFields, protectAdmin, createSchedule);
router.delete('/:id', scheduleExists, protectAdmin, deleteSchedule);
router.patch('/:id', validateScheduleFields, scheduleExists, protectAdmin, updateSchedule);
router.get('/:doctorId/:date', getScheduleByDoctorDate);
router.get('/:sedeId/:specialityId/:date', getScheduleBySedeSpecialityDate);


module.exports = { ScheduleRouter: router };
