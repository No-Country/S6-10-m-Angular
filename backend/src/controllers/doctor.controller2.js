const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { AppError } = require('../utils/appError');

const { Doctor } = require('../models/doctor.model');

const { Speciality } = require('../models/speciality.model');

const { Sede } = require('../models/sede.model');

// utils
const { catchAsync } = require('../utils/catchAsync');

const getAllDoctors = catchAsync(async (req, res, next) => {
  const doctors = await Doctor.findAll({ 
      where: { active: true },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'active'] },
      include: {
        model: Speciality, where: { active: true },
        attributes: { exclude: ['createdAt', 'updatedAt', 'active'] },
      }, 
    });


  res.status(200).json({
    doctors,
  });
});

const getDoctorById = catchAsync(async (req, res, next) => {
  const { doctor } = req;

  res.status(200).json({ doctor });
});

// const registerDoctor = catchAsync(async (req, res, next) => {
//   const { firstName, lastName, email, password, phone, specialityId, sedeId, codeId } = req.body;

//   const salt = await bcrypt.genSalt(12);
//   const hashPassword = await bcrypt.hash(password, salt);

//   const doctor = await Doctor.create({
//       firstName,
//       lastName,
//       email,
//       password: hashPassword,
//       phone,
//       specialityId,
//       sedeId,
//       codeId
//   });

//   doctor.password = undefined;

//   res.status(201).json({
//     status: 'Success',
//     message: 'Doctor has been created',
//     doctor,
//   });
// });

const updateDoctor = catchAsync(async (req, res, next) => {
  const { doctor } = req;
  const { firstName, lastName, phone, specialityId, sedeId, codeId  } = req.body;

  await doctor.update({ firstName, lastName, phone, specialityId, sedeId, codeId  });
  res.status(200).json({ status: 'success' });
});

const deleteDoctor = catchAsync(async (req, res, next) => {
  const { doctor } = req;

  await doctor.update({ active: false });

  res.status(201).json({
    status: 'success',
    message: `Doctor account has been deleted`,
  });
});

// const loginDoctor = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;

//   // Validate that doctor exists with given email
//   const doctor = await Doctor.findOne({
//     where: { email, active: true },
//   });

//   // Compare password with db
//   if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
//     return next(new AppError('Invalid credentials', 400));
//   }

//   // Generate JWT
//   const token = await jwt.sign({ id: doctor.id }, process.env.JWT_SEC, {
//     expiresIn: '24h',
//   });

//   doctor.password = undefined;

//   res.status(200).json({ token, doctor });
// });

const getDoctorBySpecialitySede = catchAsync(async (req, res, next) => {
  const { specialityId, sedeId } = req.params;

  const doctor = await Doctor.findAll({
    where: { specialityId, sedeId, active: true },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'active'] },
    include: {
      model: Speciality, where: { active: true },
      attributes: { exclude: ['createdAt', 'updatedAt', 'active'] }
        // model: Sede, where : { active: true }
    },
  });

  if (!doctor) {
    return next(new AppError(`Doctor not found given that with that specialty and sede`, 404));
  }

  res.status(200).json({
    doctor,
  });
});

module.exports = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorBySpecialitySede,
};
