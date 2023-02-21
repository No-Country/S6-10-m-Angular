const { Doctor } = require('../models/doctor.model');

const { encryptPassword } = require('../helpers/bcrypt');

const findById = async (id) => {
    const doctor = await Doctor.findByPk({
        where: { id, active: true },
        attributes: [
            'firstName',
            'lastName',
            'email',
            'codeId',
            'phone',
            'role',
        ],
    });

    return doctor;
};

const newDoctor = async ({
    firstName,
    lastName,
    email,
    codeId,
    password,
    phone,
    role,
    specialityId,
    sedeId,
}) => {
    const existingDoctor = await findOneDoctor(email);
    if (existingDoctor) {
        throw new Error('Email already exists');
    }
    const encrypted = await encryptPassword(password);

    return Doctor.create({
        firstName,
        lastName,
        email,
        codeId,
        password: encrypted,
        phone,
        role,
        specialityId,
        sedeId,
    });
};

const findOneDoctor = async (email) => {
    return Doctor.findOne({ where: { email } });
};

const updateDoctor = async (userData, email) => {
    const doctor = await Doctor.findOne({ where: { email, active: true } });
    if (!doctor) {
        throw new Error('Doctor not found');
    }
    const updatedDoctor = await doctor.update(userData);
    return updatedDoctor;
};

const findMatch = async (query) => {
    const matched = await Doctor.findOne(query);
    return !!matched;
};

module.exports = {
    newDoctor,
    findOneDoctor,
    updateDoctor,
    findById,
    findMatch,
};
