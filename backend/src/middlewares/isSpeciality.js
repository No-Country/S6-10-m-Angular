// Utils
const { catchAsync } = require('../utils/catchAsync');

const { AppError } = require('../utils/appError');

const { Speciality } = require('../models/speciality.model')

const specialityExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    console.log( 'helloooooo' )

    console.log( id )

    const speciality = await Speciality.findOne({
      where: { id, active: true },
    });

    if (!speciality) {
      return next(new AppError(`speciality not found given that id: ${id}`, 404));
    }

    // Add speciality data to the req object
    req.speciality = speciality;
    next();
  });

module.exports = { specialityExists };
