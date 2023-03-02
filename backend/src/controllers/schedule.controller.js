const { Op } = require('sequelize');

const { Schedule } = require('../models/schedule.model')
const { Speciality } = require('../models/speciality.model')
const { Doctor } = require('../models/doctor.model')

// utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const getScheduleByDoctorDate = catchAsync(async (req, res, next) => {
  const { doctorId, date } = req.params;

  const schedule = await Schedule.findAll({
    where: { doctorId, date, active: true, status: 'available' },
    order: [['hour', 'Asc']],
    attributes: { exclude: ['createdAt', 'updatedAt', 'active', 'status'] },
    include: {
      model: Doctor,
      where: { active: true },
      attributes: { exclude: ['id','createdAt', 'updatedAt', 'active', 'status', 'password', 'role', 'phone', 'codeId', 'specialityId', 'sedeId'] },
      include: {
        model: Speciality, 
        where: { active: true },
        attributes: { exclude: ['createdAt', 'updatedAt', 'active', 'status', 'active', 'id'] },
      }
    }
  });

  if (!schedule) {
    return next(new AppError(`Schedule not found given that doctor and date`, 404));
  }

  res.status(200).json({
    schedule,
  });
});





const getAllSchedule = catchAsync(async (req, res, next) => {
  const schedule = await Schedule.findAll({ 
    where: {active: true, status: 'available' },
    order: [['date', 'Asc']],
    order: [['hour', 'Asc']],
    attributes: { exclude: ['createdAt', 'updatedAt', 'active'] },
    include: {
      model: Doctor, where: { active: true },
      attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'active', 'password', 'email', 'phone', 'role', 'sedeId', 'codeId'] },
      include: {
        model: Speciality, where: { active: true },
        attributes: { exclude: ['id','createdAt', 'updatedAt', 'active'] },
      }
    },
});
  res.status(200).json({
    schedule,
  });
});

const createSchedule= catchAsync(async (req, res, next) => {
    const { date, hour, office, status, doctorId } = req.body;

    const schedule= await Schedule.create({
      date,
      hour,
      office,
      status,
      doctorId,
    });
    res.status(201).json({
      status: 'Success',
      message: 'Schedule has been created',
      schedule
    });
  });

const deleteSchedule = catchAsync(async (req, res, next) => {
    const { schedule } = req;

    await schedule.update({ active: false });

    res.status(201).json({
        status: 'success',
        message: `Schedule has been deleted`,
    });
});

const updateSchedule = catchAsync(async (req, res, next) => {
    const { schedule } = req;
    const { code, country } = req.body;

    await schedule.update({ code, country });
    res.status(200).json({ status: 'success', message: 'Schedule has been updated', schedule });
  });

  const getScheduleBySedeSpecialityDate = catchAsync(async (req, res, next) => {
    const { sedeId, specialityId, date } = req.params;
  
    // Obtiene la lista de doctores para la sede y especialidad indicadas
    const doctors = await Doctor.findAll({ where: { sedeId, specialityId, active: true }});

    // Obtiene los ids de los doctores encontrados
    // const doctorIds = doctors.map(doctor => doctor.id);
    // const doctorIds = doctors.map(doctor => doctor['id']);
    const doctorIds = doctors.map(doctor => { return doctor.id; });
    
    // Obtiene los schedules para los doctores encontrados en la fecha indicada
    const schedules = await Schedule.findAll({
      where: {
        doctorId: { [Op.in]: doctorIds },
        date,
        active: true,
        status: 'available'
    },
    order: [['hour', 'ASC']],
    attributes: { exclude: ['createdAt', 'updatedAt', 'active', 'status'] },
    include: [
      {
        model: Doctor,
        where: { active: true },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'active', 'status', 'password', 'phone', 'codeId', 'specialityId', 'sedeId'] },
        include: {
          model: Speciality,
          where: { active: true },
          attributes: { exclude: ['createdAt', 'updatedAt', 'active', 'status', 'active', 'id'] }
        }
      }
    ]
  });

  if (!schedules || schedules.length === 0) {
    return next(new AppError(`Schedules not found for the given date and doctor`, 404));
  }

  res.status(200).json({
    schedules,
  });
});


module.exports = {
    createSchedule,
    deleteSchedule,
    updateSchedule,
    getAllSchedule,
    getScheduleByDoctorDate,
    getScheduleBySedeSpecialityDate,
};
