const { User } = require('../models/user.model');

const { encryptPassword } = require('../helpers/bcrypt');

const findById = async (id) => {
    const user = await User.findByPk({
        where: { id },
        attributes: ['firstName', 'lastName', 'email', 'code', 'phone', 'role'],
    });

    return user;
};

const newUser = async ({
    firstName,
    lastName,
    email,
    password,
    code,
    phone,
    role,
}) => {
    const encrypted = await encryptPassword(password);

    return User.create({
        firstName,
        lastName,
        email,
        password: encrypted,
        code,
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

module.exports = {
    newUser,
    findOneUser,
    updateUser,
    findById,
};
