
const { Sede } = require('../models/sede.model')


// utils
const { catchAsync } = require('../utils/catchAsync');

const getAllSede = catchAsync(async (req, res, next) => {
  const sedes = await Sede.findAll({ 
    where: {active: true },
    order: [['name', 'Asc']],
  });
  res.status(200).json({
    sedes,
  });
});

const createSede = catchAsync(async (req, res, next) => {
    const { name, address, phone } = req.body;

    const sede = await Sede.create({
      name,
      address,
      phone,
    });
    res.status(201).json({
      status: 'Success',
      message: 'Sede has been created',
      sede,
    });
  });

const deleteSede = catchAsync(async (req, res, next) => {
    const { sede } = req;

    await sede.update({ active: false });

    res.status(201).json({
        status: 'success',
        message: `Sede has been deleted`,
    });
});

const updateSede = catchAsync(async (req, res, next) => {
    const { sede } = req;
    const { name, address, phone } = req.body;

    await sede.update({ name, address, phone });
    res.status(200).json({ status: 'success', message: 'sede has been updated' });
  });

  const getSedeById = catchAsync(async (req, res, next) => {
    const { sede } = req;
    res.status(200).json({
      sede,
    });
  });
  


module.exports = {
    createSede,
    deleteSede,
    updateSede,
    getAllSede,
    getSedeById,
};
