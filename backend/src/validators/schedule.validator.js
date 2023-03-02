const { check } = require('express-validator');

const { validateResult } = require('../middlewares/validateResult');

const validateScheduleFields = [
    check('date', 'Enter a date')
        .exists()
        .isLength({ min: 1 })
        .withMessage('Date is required')
        .isLength({ max: 30 })
        .withMessage('Date is required')
        .trim()
        .escape(),

    check('hour', 'Enter a hour')
        .exists()
        .isLength({ min: 11 })
        .withMessage('Hour must be 11 letters')
        .isLength({ max: 13 })
        .withMessage('Name must be 13 letters')
        .trim()
        .escape(),

        check('status', 'Enter a status (available, not available, canceled)')
        .exists()
        .isLength({ min: 8 })
        .withMessage('Hour must be between 8 letters')
        .isLength({ max: 14 })
        .withMessage('Name must be between 14 letters')
        .trim()
        .escape(),

        check('office', 'Enter an office ')
        .exists()
        .isLength({ min: 1 })
        .withMessage('Hour must be between 1 letters')
        .isLength({ max: 10 })
        .withMessage('Name must be between 10 letters')
        .trim()
        .escape(),

        check('doctorId', 'Enter a valid doctorId')
        .exists()
        .withMessage('Enter a valid doctorId')
        .trim()
        .escape(),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];


module.exports = {
    validateScheduleFields,
};
