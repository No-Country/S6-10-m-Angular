const { success, error, serverError } = require('../helpers/responses');

const { generateJWT, validateJWT } = require('../helpers/jwt');

const { comparePassword } = require('../helpers/bcrypt');

const { newDoctor, findOneDoctor } = require('../services/doctor.service');

const processMessage = require('../shared/processMessage');

const registerDoctor = async (req, res) => {
    let data = {};

    try {
        const newDoctorResult = await newDoctor(req.body);
        const token = await generateJWT(
            newDoctorResult.id,
            newDoctorResult.email,
            newDoctorResult.role
        );

        // Add sede data to the req object
        req.doctor = newDoctorResult;

        const number = newDoctorResult.phone;

        processMessage.firstProcess(number);

        data = {
            user: newDoctorResult,
            token,
        };
    } catch (err) {
        serverError({
            res,
            message: err.message,
        });
    }

    return success({
        res,
        message: 'Doctor registered successfully',
        data,
        statusCode: 201,
    });
};

// eslint-disable-next-line consistent-return
const loginDoctor = async (req, res) => {
    const { email, password } = req.body;
    let doctor = {};

    try {
        doctor = await findOneDoctor(email);
    } catch (err) {
        return serverError({
            res,
            message: 'Email or password incorrect',
        });
    }

    if (!doctor) {
        return error({
            res,
            message: 'Doctor does not exist',
        });
    }

    const validPassword = await comparePassword(password, doctor.password);

    if (validPassword) {
        let token = '';

        try {
            token = await generateJWT(doctor.id, doctor.email, doctor.role);
        } catch (err) {
            return serverError({
                res,
                message: err.message,
            });
        }

        return success({
            res,
            message: 'Doctor logged in successfully',
            data: { doctor, token },
        });
    }

    return error({
        res,
        message: 'Invalid credentials',
    });
};

// eslint-disable-next-line consistent-return
const authenticateDoctor = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = await validateJWT(token);
        if (!decoded.status) {
            return error({ res, message: decoded.message });
        }
        req.user = decoded.data;
        next();
    } catch (err) {
        serverError({
            res,
            message: 'An error occurred while authenticating the doctor',
        });
    }
};

module.exports = {
    registerDoctor,
    loginDoctor,
    authenticateDoctor,
};
