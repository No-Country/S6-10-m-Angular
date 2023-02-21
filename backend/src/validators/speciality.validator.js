const { check } = require('express-validator');

const { validateResult } = require('../middlewares/validateResult');

const validateSpecialityFields = [
    check('name', 'Enter a name')
        .exists()
        .isLength({ min: 3 })
        .withMessage('Name must be between 3-100 letters')
        .isLength({ max: 100 })
        .withMessage('Name must be between 3-100 letters')
        .trim()
        .escape(),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];


module.exports = {
    validateSpecialityFields,
};
