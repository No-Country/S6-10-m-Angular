// Utils
const { catchAsync } = require('../utils/catchAsync');

const { AppError } = require('../utils/appError');

const { Sede } = require('../models/sede.model')

const sedeExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const sede = await Sede.findOne({
      where: { id, active: true },
    });

    if (!sede) {
      return next(new AppError(`Sede not found given that id: ${id}`, 404));
    }
  
    // Add sede data to the req object
    req.sede = sede;
    next();
  });
  
module.exports = { sedeExists };
