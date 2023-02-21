const express = require('express');

const router = express.Router();

const {
    createCode,
    deleteCode,
    updateCode,
    getAllCode,
} = require('../controllers/code.controller');

const {
    codeExists
} = require('../middlewares/isCode')

const {
    protectToken,
    protectAdmin,
  } = require('../middlewares/users.middlewares');

const {
    validateCodeFields,
} = require('../validators/code.validator');

// routes:
router.get('/', getAllCode);

// Apply protectToken middleware
router.use(protectToken);

router.post('/', validateCodeFields, protectAdmin, createCode);
router.delete('/:id', codeExists, protectAdmin, deleteCode);
router.patch('/:id', validateCodeFields, codeExists, protectAdmin, updateCode);


module.exports = { CodeRouter: router };
