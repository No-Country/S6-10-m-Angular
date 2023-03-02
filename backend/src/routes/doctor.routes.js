const express = require('express');

const router = express.Router();

const {
    registerDoctor,
    loginDoctor,
    getAllDoctors,
    getDoctorById,
    getDoctorBySpecialitySede,
    updateDoctor,
    deleteDoctor,
} = require('../controllers/doctor.controller');

const {
    protectToken,
    protectAdmin,
    doctorExists,
} = require('../middlewares/users.middlewares')

const {
    validateRegisterFields,
    validateLoginFields,
} = require('../validators/doctor.validator');


// Utils
const { upload } = require('../utils/multer');


router.post(
    '/register',
    upload.single('role'),
    validateRegisterFields,
    protectAdmin,
    registerDoctor
  );

router.post('/login', validateLoginFields, loginDoctor);

// router.post('/register', validateRegisterFields, protectAdmin, registerDoctor);


// Apply protectToken middleware
router.use(protectToken);

router.get('/', getAllDoctors);
router.get('/:id', doctorExists, getDoctorById);
router.get('/:specialityId/:sedeId', getDoctorBySpecialitySede);
router.patch('/:id', upload.single('role'), doctorExists, protectAdmin, updateDoctor);
router.delete('/:id', doctorExists, protectAdmin, deleteDoctor);


module.exports = { DoctorRouter: router };
