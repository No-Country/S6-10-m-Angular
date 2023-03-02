// Utils
const { catchAsync } = require('../utils/catchAsync');

const { AppError } = require('../utils/appError');

const { Appointment } = require('../models/appointment.model')

const appointmentExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const appointment = await Appointment.findOne({
      where: { id, active: true },
    });

    if (!appointment) {
      return next(new AppError(`Appointment not found given that id: ${id}`, 404));
    }
  
    // Add sede data to the req object
    req.appointment = appointment;
    next();
  });
  
module.exports = { appointmentExists };
