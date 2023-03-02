const { User } = require('../models/user.model');

const { encryptPassword } = require('../helpers/bcrypt');

const findById = async (id) => {
    const user = await User.findByPk({
        where: { id },
        attributes: ['firstName', 'lastName', 'email', 'dni', 'codeId', 'phone', 'role'],
    });

    return user;
};

const newUser = async ({
    firstName,
    lastName,
    email,
    password,
    dni,
    codeId,
    phone,
    role,
}) => {
    const existingUser = await findOneUser(email);
    if (existingUser) {
        throw new Error('Email already exists');
    }
    const encrypted = await encryptPassword(password);

    return User.create({
        firstName,
        lastName,
        email,
        password: encrypted,
        dni,
        codeId,
        phone,
        role,
    });
};

const findOneUser = async (email) => {
    return User.findOne({ where: { email } });
};

const updateUser = async (userData, email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const updatedUser = await user.update(userData);
    return updatedUser;
};

const findMatch = async (query) => {
    const matched = await User.findOne(query);
    return !!matched;
};

module.exports = {
    newUser,
    findOneUser,
    updateUser,
    findById,
    findMatch,
};
