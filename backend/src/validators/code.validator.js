const { check } = require('express-validator');

const { validateResult } = require('../middlewares/validateResult');

const validateCodeFields = [
    check('code', 'Enter a code')
        .exists()
        .isLength({ min: 1 })
        .withMessage('Name must be between 1-8 letters')
        .isLength({ max: 8 })
        .withMessage('Name must be between 1-8 letters')
        .trim()
        .escape(),

    check('country', 'Enter a country')
        .exists()
        .isLength({ min: 1 })
        .withMessage('Name must be between 1-20 letters')
        .isLength({ max: 20 })
        .withMessage('Name must be between 1-20 letters')
        .trim()
        .escape(),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];


module.exports = {
    validateCodeFields,
};
