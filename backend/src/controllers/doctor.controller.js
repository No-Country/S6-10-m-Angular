const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Doctor } = require('../models/doctor.model');
const { Code } = require('../models/code.model');
const { Speciality } = require('../models/speciality.model');
const processMessage = require('../shared/processMessage');

// utils
const { catchAsync } = require('../utils/catchAsync');
const { storage } = require('../utils/firebase');
const { AppError } = require('../utils/appError');

const registerDoctor = catchAsync(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        codeId,
        password,
        phone,
        specialityId,
        sedeId,
    } = req.body;

    // image
    const imgRef = ref(
        storage,
        `doctors/${Date.now()}-${req.file.originalname}`
    );
    const imgUploaded = await uploadBytes(imgRef, req.file.buffer);
    console.log(imgUploaded);

    // hashpassword
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doctor = await Doctor.create({
        firstName,
        lastName,
        email,
        codeId,
        password: hashedPassword,
        phone,
        role: imgUploaded.metadata.fullPath,
        specialityId,
        sedeId,
    });

    // Generate JWT
    const token = await jwt.sign({ id: doctor.id }, process.env.JWT_SEC, {
        expiresIn: '24h',
    });

    res.status(201).json({
        status: 'Success',
        message: 'Doctor has been created',
        doctor,
        token,
    });

    // whatsapp message
    const prefix = await Code.findOne({ where: { id: doctor.codeId } });
    const number = prefix.code + doctor.phone;
    processMessage.firstProcess(number);
});

const loginDoctor = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate that user exists with given email
    const doctor = await Doctor.findOne({
        where: { email, active: true },
    });

    // Compare password with db
    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
        return next(new AppError('Invalid credentials', 400));
    }

    // Generate JWT
    const token = await jwt.sign({ id: doctor.id }, process.env.JWT_SEC, {
        expiresIn: '24h',
    });

    doctor.password = undefined;

    res.status(200).json({ token, doctor });
});

const getAllDoctors = catchAsync(async (req, res, next) => {
    // SELECT * FROM users;
    // Include the posts that each user has created
    // Include the comments that each user has created
    // Include the post in which the comment was made
    const doctors = await Doctor.findAll({
        where: { active: true },
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'active'],
        },
        include: {
            model: Speciality,
            where: { active: true },
            attributes: { exclude: ['createdAt', 'updatedAt', 'active'] },
        },
    });

    // Map async: you will use this techinque everytime that you need some async operations inside of an array
    const doctorsPromises = doctors.map(async (doctor) => {
        // Create firebase img ref and get the full path
        const imgRef = ref(storage, doctor.role);
        const url = await getDownloadURL(imgRef);
        console.log('url', url);

        // Update the user's profileImgUrl property
        doctor.role = url;
        return doctor;
    });

    // Resolve every promise that map gave us ([ Promise { <pending> }, Promise { <pending> } ])
    const doctorsResolved = await Promise.all(doctorsPromises);

    res.status(200).json({
        doctors: doctorsResolved,
    });
});

const getDoctorById = catchAsync(async (req, res, next) => {
    const { doctor } = req;

    // Get url from firebase
    const imgRef = ref(storage, doctor.role);
    const url = await getDownloadURL(imgRef);

    doctor.role = url;

    res.status(200).json({ doctor });
});

const updateDoctor = catchAsync(async (req, res, next) => {
    const { doctor } = req;
    const { firstName, lastName, phone, specialityId, sedeId, codeId } =
        req.body;

    // image
    const imgRef = ref(
        storage,
        `doctors/${Date.now()}-${req.file.originalname}`
    );
    const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

    await doctor.update({
        firstName,
        lastName,
        phone,
        specialityId,
        sedeId,
        codeId,
        role: imgUploaded.metadata.fullPath,
    });
    res.status(200).json({ status: 'success', doctor: doctor });
});

const deleteDoctor = catchAsync(async (req, res, next) => {
    const { doctor } = req;

    await doctor.update({ active: false });

    res.status(201).json({
        status: 'success',
        message: `Doctor account has been deleted`,
    });
});

const getDoctorBySpecialitySede = catchAsync(async (req, res, next) => {
    const { specialityId, sedeId } = req.params;
    
    const doctors = await Doctor.findAll({
        where: { specialityId, sedeId, active: true },
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'active'],
        },
        include: {
            model: Speciality,
            where: { active: true },
            attributes: { exclude: ['createdAt', 'updatedAt', 'active'] },
            // model: Sede, where : { active: true }
        },
    });

    if (!doctors) {
        return next(
            new AppError(`Doctor not found given that specialty and sede`, 404)
        );
    }

    // Map async: you will use this techinque everytime that you need some async operations inside of an array
    const doctorsPromises = doctors.map(async (doctor) => {
        // Create firebase img ref and get the full path
        const imgRef = ref(storage, doctor.role);
        const url = await getDownloadURL(imgRef);

        // Update the user's profileImgUrl property
        doctor.role = url;
        return doctor;
    }); //map ends

    // Resolve every promise that map gave us ([ Promise { <pending> }, Promise { <pending> } ])
    const doctorsResolved = await Promise.all(doctorsPromises);

    res.status(200).json({
        doctors: doctorsResolved,
    });
});

module.exports = {
    registerDoctor,
    loginDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    getDoctorBySpecialitySede,
};
