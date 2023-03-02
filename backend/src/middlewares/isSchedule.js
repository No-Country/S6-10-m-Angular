// Utils
const { catchAsync } = require('../utils/catchAsync');

const { AppError } = require('../utils/appError');

const { Schedule } = require('../models/schedule.model')

const scheduleExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const schedule = await Schedule.findOne({
      where: { id, active: true },
    });

    if (!schedule) {
      return next(new AppError(`Schedule not found given that id: ${id}`, 404));
    }
  
    // Add sede data to the req object
    req.schedule = schedule;
    next();
  });
  
module.exports = { scheduleExists };