const express = require('express');

const router = express.Router();

const {
    createSede,
    deleteSede,
    updateSede,
    getAllSede,
    getSedeById,
} = require('../controllers/sede.controller');

const {
    sedeExists
} = require('../middlewares/isSede')

const {
    protectToken,
    protectAdmin,
  } = require('../middlewares/users.middlewares');

const {
    validateSedeFields,
} = require('../validators/sede.validator');

// Apply protectToken middleware
router.use(protectToken);

router.get('/', getAllSede);
router.get('/:id', sedeExists, getSedeById);
router.post('/', validateSedeFields, protectAdmin, createSede);
router.delete('/:id', sedeExists, protectAdmin, deleteSede);
router.patch('/:id', validateSedeFields, sedeExists, protectAdmin, updateSede);

module.exports = { sedeRouter: router };
