const express = require('express');

const router = express.Router();

const {
    registerDoctor,
    loginDoctor,
    authenticateDoctor,
} = require('../controllers/doctor.controller');

const {

    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    getDoctorBySpecialitySede,
} = require('../controllers/doctor.controller2');

const {
    protectToken,
    protectAdmin,
    doctorExists,
} = require('../middlewares/users.middlewares')

const {
    validateRegisterFields,
    validateLoginFields,
} = require('../validators/doctor.validator');


router.post('/login', validateLoginFields, loginDoctor);

router.post('/register', validateRegisterFields, protectAdmin, registerDoctor);

// Apply protectToken middleware
router.use(protectToken);

router.get('/', protectAdmin, getAllDoctors);
router.get('/:id', protectAdmin, doctorExists, getDoctorById);
router.get('/:specialityId/:sedeId', protectAdmin, getDoctorBySpecialitySede);
// router.use(authenticateDoctor);


module.exports = { DoctorRouter: router };
