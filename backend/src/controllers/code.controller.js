
const { Code } = require('../models/code.model')


// utils
const { catchAsync } = require('../utils/catchAsync');

const getAllCode = catchAsync(async (req, res, next) => {
  const code = await Code.findAll({ 
    where: {active: true },
    order: [['country', 'Asc']],
});
  res.status(200).json({
    code,
  });
});

const createCode= catchAsync(async (req, res, next) => {
    const { code, country } = req.body;

    const newCode= await Code.create({
      code,
      country,
    });
    res.status(201).json({
      status: 'Success',
      message: 'Code has been created',
      newCode
    });
  });

const deleteCode = catchAsync(async (req, res, next) => {
    const { codex } = req;

    await codex.update({ active: false });

    res.status(201).json({
        status: 'success',
        message: `Code has been deleted`,
    });
});

const updateCode = catchAsync(async (req, res, next) => {
    const { codex } = req;
    const { code, country } = req.body;

    await codex.update({ code, country });
    res.status(200).json({ status: 'success', message: 'Code has been updated', codex });
  });



module.exports = {
    createCode,
    deleteCode,
    updateCode,
    getAllCode,
};
