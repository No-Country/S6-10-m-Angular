const bcrypt = require('bcryptjs');

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
    const compare = await bcrypt.compare(password, hashedPassword);
    return compare;
};

module.exports = { encryptPassword, comparePassword };
