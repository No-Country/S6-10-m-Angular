const { check } = require('express-validator');

const { validateResult } = require('../middlewares/validateResult');

const validateRegisterFields = [
    check('firstName', 'Enter a name')
        .exists()
        .isLength({ min: 3 })
        .withMessage('Name must be between 3-15 letters')
        .isLength({ max: 15 })
        .withMessage('Name must be between 3-15 letters')
        .trim()
        .escape(),

    check('lastName', 'Enter a last name')
        .exists()
        .isLength({ min: 3 })
        .withMessage('Name must be between 3-15 letters')
        .isLength({ max: 15 })
        .withMessage('Name must be between 3-15 letters')
        .trim()
        .escape(),

    check('email', 'Enter a valid email')
        .exists()
        .isEmail()
        .withMessage('Enter a email valid format')
        .bail()
        .trim()
        .escape(),

    check(
        'password',
        'Password must be at least 8 characters, including an uppercase letter and a number'
    )
        .exists()
        .withMessage('Enter a password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/\d/)
        .withMessage('Password must include a number')
        .matches('[A-Z]')
        .withMessage('Password must include an uppercase letter')
        .trim()
        .escape(),

        check('codeId', 'Enter a valid code uuid')
        .exists()
        .withMessage('Enter a valid uuid format')
        .trim()
        .escape(),

        check('phone', 'Enter a valid phone number')
        .exists()
        .withMessage('Enter a valid format')
        .trim()
        .escape(),

        check('role', "Role must be 'patient' or 'admin'")
        .optional(),

        check('active', 'Active must be a boolean').optional().isBoolean(),

        check('specialityId', 'Enter a valid specialityId')
        .exists()
        .withMessage('Enter a valid specialityId')
        .trim()
        .escape(),

        check('sedeId', 'Enter a valid sedeId')
        .exists()
        .withMessage('Enter a valid sedeId')
        .trim()
        .escape(),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

const validateLoginFields = [
    check('email', 'Enter a email')
        .exists()
        .isEmail()
        .withMessage('Enter a email valid format')
        .bail()
        .trim()
        .escape(),

    check('password', 'Enter a password')
        .exists()
        .isLength({ min: 8 })
        .withMessage('Enter a valid password')
        .matches(/\d/)
        .withMessage('Password must include a number')
        .matches('[A-Z]')
        .withMessage('Password must include an uppercase letter')
        .trim()
        .escape(),

    (req, res, next) => {
        validateResult(req, res, next);
    },
];

module.exports = {
    validateRegisterFields,
    validateLoginFields,
};
