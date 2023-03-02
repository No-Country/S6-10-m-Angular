
const { Appointment } = require('../models/appointment.model');
const { Schedule } = require('../models/schedule.model');
// const { Doctor } = require('../models/doctor.model');


// utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const getAllAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findAll({ 
    where: {active: true },
    attributes: { exclude: ['createdAt', 'updatedAt', 'active'] },
    include: {
      model: Schedule,
      attributes: { exclude: ['createdAt', 'updatedAt', 'id'],
},

    }
});
  res.status(200).json({
    appointment,
  });
});

const getAppointmentByUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await Appointment.findAll({
    where: { userId: id, active: true },
    // order: [['hour', 'Asc']],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Schedule,
      // where: { active: true },
      attributes: { exclude: ['id','createdAt', 'updatedAt', 'active', 'status'] },
      // include: {
      //   model: Speciality, 
      //   where: { active: true },
      //   attributes: { exclude: ['createdAt', 'updatedAt', 'active', 'status', 'active', 'id'] },
      // }
    }
  });

  if (!appointment) {
    return next(new AppError(`Appointment not found given that user`, 404));
  }

  res.status(200).json({
    appointment,
  });
});


const createAppointment= catchAsync(async (req, res, next) => {
    const { type, userId, scheduleId } = req.body;

    const schedule = await Schedule.findOne({ where: {id: scheduleId}})

    await schedule.update({status: 'not available'})

    const appointment = await Appointment.create({
      type,
      userId,
      scheduleId,
    });
    res.status(201).json({
      status: 'Success',
      message: 'Appointment has been created',
      appointment
    });
  });


  const cancelAppointment = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const appointment = await Appointment.findOne({where: {id}})

    const schedule = await Schedule.findOne({where: {id: appointment.scheduleId}});

    await schedule.update({ status: 'available'});

    await appointment.update({active: false})

    res.status(201).json({
      status: 'Success',
      message: 'Appointment has been cancel',
      appointment
    });
  });




module.exports = {
    createAppointment,
    getAllAppointment,
    getAppointmentByUser,
    cancelAppointment,
};
