const { success, error, serverError } = require('../helpers/responses');

const { generateJWT, validateJWT } = require('../helpers/jwt');

const { comparePassword } = require('../helpers/bcrypt');

const { newUser, findOneUser } = require('../services/user.service');

const processMessage = require("../shared/processMessage");

const registerUser = async (req, res) => {

    async function envioMail( firstName, email ){
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.USEREMAIL,
            pass: process.env.PASSMAIL
          }
        });
        let envio = await transporter.sendMail({
          from: process.env.USEREMAIL,
          to: `${email}`,
          subject:"Alta de usuario",
          html:`Bienvenido a la app de Citamed ${firstName}! Con nosotros vas a poder pedir, modificar y cancelar turnos medicos de manera facil y rapida. `
        })
      }

    let data = {};

    try {
        const newUserResult = await newUser(req.body);
        const token = await generateJWT(
            newUserResult.id,
            newUserResult.email,
            newUserResult.role
        );
        envioMail( user, email)

        // Add sede data to the req object
        req.user = newUserResult;

        const number = newUserResult.code + newUserResult.phone;

        processMessage.firstProcess(number);

        data = {
            user: newUserResult,
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
        message: 'User registered successfully',
        data,
        statusCode: 201,
    });
};

// eslint-disable-next-line consistent-return
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    let user = {};

    try {
        user = await findOneUser(email);
    } catch (err) {
        return serverError({
            res,
            message: 'Email or password incorrect',
        });
    }

    if (!user) {
        return error({
            res,
            message: 'User does not exist',
        });
    }

    const validPassword = await comparePassword(password, user.password);

    if (validPassword) {
        let token = '';

        try {
            token = await generateJWT(user.id, user.email, user.role);
        } catch (err) {
            return serverError({
                res,
                message: err.message,
            });
        }

        return success({
            res,
            message: 'User logged in successfully',
            data: { user, token },
        });
    }

    return error({
        res,
        message: 'Invalid credentials',
    });
};

// eslint-disable-next-line consistent-return
const authenticateUser = async (req, res, next) => {
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
            message: 'An error occurred while authenticating the user',
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    authenticateUser,
};
