
const { Sede } = require('../models/sede.model')


// utils
const { catchAsync } = require('../utils/catchAsync');

const getAllSede = catchAsync(async (req, res, next) => {
  const sedes = await Sede.findAll({ where: {active: true }});
  res.status(200).json({
    sedes,
  });
});

const createSede = catchAsync(async (req, res, next) => {
    const { name, address, phone } = req.body;
    console.log('name: ', name);
    console.log('address: ', address);
    console.log('phone: ', phone)
    
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



module.exports = {
    createSede,
    deleteSede,
    updateSede,
    getAllSede,
};
