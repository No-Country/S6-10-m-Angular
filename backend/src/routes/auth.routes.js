const express = require('express');

const router = express.Router();

const {
    registerUser,
    loginUser,
    authenticateUser,
} = require('../controllers/auth.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.use(authenticateUser);

module.exports = router;
