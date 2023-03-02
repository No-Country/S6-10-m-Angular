const express = require('express');

const router = express.Router();

const {passwordEmail, passwordReset} = require('../controllers/passwordReset.controller')
// Handle password reset requests
router.post('/password', passwordEmail);

// Handle password reset requests with token
router.post('/password/:token', passwordReset);


module.exports = { passwordResetRouter: router };

