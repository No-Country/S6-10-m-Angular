const express = require('express');

const router = express.Router();

const {
    createSpeciality,
    deleteSpeciality,
    updateSpeciality,
    getAllSpeciality,
    getSpecialityById,
} = require('../controllers/speciality.controller');

const {
    specialityExists
} = require('../middlewares/isSpeciality')

const {
    protectToken,
    protectAdmin,
  } = require('../middlewares/users.middlewares');

const {
    validateSpecialityFields,
} = require('../validators/speciality.validator');

// Apply protectToken middleware
router.use(protectToken);

router.get('/', getAllSpeciality);
router.get('/:id', specialityExists, getSpecialityById);
router.post('/', validateSpecialityFields, protectAdmin, createSpeciality);
router.delete('/:id', specialityExists, protectAdmin, deleteSpeciality);
router.patch('/:id', validateSpecialityFields, specialityExists, protectAdmin, updateSpeciality);

module.exports = { SpecialityRouter: router };
