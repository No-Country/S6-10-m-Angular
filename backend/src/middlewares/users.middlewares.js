const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const { Doctor } = require('../models/doctor.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
// const { Speciality } = require('../models/speciality.model');
const { Sede } = require('../models/sede.model');


const protectToken = catchAsync(async (req, res, next) => {
  let token;

  // Extract token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // ['Bearer', 'token']
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Session invalid', 403));
  }

  // Validate token
  const decoded = jwt.verify(token, process.env.JWT_SEC);

  // decoded returns -> { id: 1, iat: 1651713776, exp: 1651717376 }
  const user = await User.findOne({
    where: { id: decoded.id, active: true },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token is no longer available', 403)
    );
  }

  req.sessionUser = user;
  next();
});

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, active: true },
    attributes: { exclude: ['password'] }

  });

  if (!user) {
    return next(new AppError(`User not found given that id: ${id}`, 404));
  }

  // Add user data to the req object
  req.user = user;
  next();
});

const protectAccountOwner = catchAsync(async (req, res, next) => {
  // Get current session user and the user that is going to be updated
  const { sessionUser, user } = req;

  // Compare the id's
  if (sessionUser.id !== user.id) {
    // If the ids aren't equal, return error
    return next(new AppError('You do not own this account', 403));
  }

  // If the ids are equal, the request pass
  next();
});

const protectAdmin = catchAsync(async(req, res, next) => {
// Get token
let token;

if (
  req.headers.authorization &&
  req.headers.authorization.startsWith('Bearer')
) {
  // Extract token
  // req.headers.authorization = 'Bearer token'
  token = req.headers.authorization.split(' ')[1]; // -> [Bearer, token]
}

// Check if the token was sent or not
if (!token) {
  return next(new AppError('The token was invalid', 403));
}

// Verify the token
const { role } = jwt.verify(token, process.env.JWT_SEC);

// // Verify the token's owner
// const user = await User.findOne({
//   where: { id: id, status: 'active' },
// });


if (role !== 'admin') {
  return next(new AppError('You do not have the right access level.', 403));
}

// Grant access
next();

});


const doctorExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const doctor = await Doctor.findOne({
    where: { id, active: true },
    attributes: { exclude: ['password'] },
    include:
    { 
      model: Sede, where: { active: true },
      attributes: { exclude: ['createdAt', 'updatedAt', 'active'] }
    }
  });

  if (!doctor) {
    return next(new AppError(`Doctor not found given that id: ${id}`, 404));
  }

  // Add user data to the req object
  req.doctor = doctor;
  next();
});



module.exports = {
  userExists,
  protectToken,
  protectAccountOwner,
  protectAdmin,
  doctorExists,
};
