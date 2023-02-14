const { check } = require('express-validator');

const { findMatch } = require('../services/user.service');

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
        .custom(async (value) => {
            const matchedUser = await findMatch({ email: value });
            if (matchedUser) {
                throw new Error('User email already exists');
            } else {
                return true;
            }
        })
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

    check('code', 'Enter zip code')
        .exists()
        .withMessage('Enter a valid format')
        .trim()
        .escape(),

    check('phone', 'Enter a valid phone number')
        .exists()
        .withMessage('Enter a valid format')
        .trim()
        .escape(),

    check('role', "Role must be 'patient' or 'admin'")
        .optional()
        .isIn(['patient', 'admin']),

    check('active', 'Active must be a boolean').optional().isBoolean(),

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
        .custom(async (value) => {
            const matchedUser = await findMatch({ email: value });
            if (matchedUser) {
                return true;
            }
            throw new Error('Email is not registered');
        })
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
