const { check } = require('express-validator');

const { validateResult } = require('../middlewares/validateResult');

const validateAppointmentFields = [
    check('type', 'Enter a code')
        .exists()
        .optional()
        .equals('face-to-face' || 'virtual')
        .isLength({ min: 1 })
        .withMessage('Name must be between 1-8 letters')
        .trim()
        .escape(),

    check('userId', 'Enter a userId')
        .exists()
        .withMessage('Enter a userId')
        .trim()
        .escape(),

        check('scheduleId', 'Enter a scheduleId')
        .exists()
        .withMessage('Enter a scheduleId')
        .trim()
        .escape(),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];


module.exports = {
    validateAppointmentFields,
};
