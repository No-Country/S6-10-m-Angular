const { check } = require('express-validator');

const { validateResult } = require('../middlewares/validateResult');

const validateSedeFields = [
    check('name', 'Enter a name')
        .exists()
        .isLength({ min: 3 })
        .withMessage('Name must be between 3-100 letters')
        .isLength({ max: 100 })
        .withMessage('Name must be between 3-100 letters')
        .trim()
        .escape(),

    check('address', 'Enter an address')
        .exists()
        .isLength({ min: 3 })
        .withMessage('Name must be between 3-15 letters')
        .isLength({ max: 100 })
        .withMessage('Name must be between 3-100 letters')
        .trim()
        .escape(),

    check('phone', 'Enter a valid phone number')
        .exists()
        .trim()
        .escape(),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];


module.exports = {
    validateSedeFields,
};
