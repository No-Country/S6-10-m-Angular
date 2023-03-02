
const { Speciality } = require('../models/speciality.model')


// utils
const { catchAsync } = require('../utils/catchAsync');

const getAllSpeciality = catchAsync(async (req, res, next) => {
  const specialities = await Speciality.findAll({ 
    where: {active: true },
    order: [['name', 'ASC'],],
  });
  res.status(200).json({
    specialities,
  });
});

const createSpeciality = catchAsync(async (req, res, next) => {
    const { name } = req.body;
    
    const speciality = await Speciality.create({ name });
    res.status(201).json({
      status: 'Success',
      message: 'Speciality has been created',
      speciality,
    });
  });

const deleteSpeciality = catchAsync(async (req, res, next) => {
    const { speciality } = req;

    await speciality.update({ active: false });

    res.status(201).json({
        status: 'success',
        message: `Speciality has been deleted`,
    });
});

const updateSpeciality = catchAsync(async (req, res, next) => {
    const { speciality } = req;
    const { name } = req.body;

    await speciality.update({ name });
    res.status(200).json({ status: 'success', message: 'Speciality has been updated' });
  });

  const getSpecialityById = catchAsync(async (req, res, next) => {
    const { speciality } = req;

    res.status(200).json({
      speciality,
    });
  });
  


module.exports = {
    createSpeciality,
    deleteSpeciality,
    updateSpeciality,
    getAllSpeciality,
    getSpecialityById,
};
