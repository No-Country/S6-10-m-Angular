// Utils
const { catchAsync } = require('../utils/catchAsync');

const { AppError } = require('../utils/appError');

const { Code } = require('../models/code.model')

const codeExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const code = await Code.findOne({
      where: { id, active: true },
    });

    if (!code) {
      return next(new AppError(`Code not found given that id: ${id}`, 404));
    }
  
    // Add sede data to the req object
    req.codex = code;
    next();
  });
  
module.exports = { codeExists };
