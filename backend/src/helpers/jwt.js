const jwt = require('jsonwebtoken');

const config = require('../config');

const generateJWT = (id, email, role) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
            email,
            role,
        };

        jwt.sign(
            payload,
            config.development.jwtSec,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) {
                    reject(Error('token could not be generated'));
                } else {
                    resolve(token);
                }
            }
        );
    });
};

const validateJWT = (token) => {
    if (!token) {
        return {
            status: false,
            message: 'No token provided',
        };
    }

    try {
        const { id, userName, role } = jwt.verify(
            token,
            config.development.jwtSec
        );

        return {
            status: true,
            message: 'success',
            data: {
                id,
                userName,
                role,
            },
        };
    } catch (error) {
        return {
            status: false,
            message: 'not valid token',
        };
    }
};

module.exports = {
    generateJWT,
    validateJWT,
};
