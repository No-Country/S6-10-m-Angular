const { error } = require('../helpers/responses');

const { validateJWT } = require('../helpers/jwt');

const isAuth = async (req, res, next) => {
    const token = req.headers.authorization;

    let userId = '';
    let userRole = '';
    let userEmail = '';

    if (token) {
        const [, splittedToken] = token.split(' ');

        const {
            data: { id, userEmail: email, role },
        } = validateJWT(splittedToken);
        userRole = role;
        userEmail = email;
        userId = id;
    }

    if (token && userId) {
        req.userEmail = userEmail;
        req.userRole = userRole;
        req.userId = userId;
        return next();
    }

    return error({
        res,
        message: 'unauthorized: token is required',
        status: 401,
    });
};

module.exports = { isAuth };
