const express = require('express');
const router = express.Router();

const { validateUserCreate, validatedUserLogin } = require('../middleware/inputValidator/authValidator');
const validated = require('../middleware/validate');
const { registerUser, loginUser, refreshAccessToken } = require('../controllers/authController')

router.post('/register', validateUserCreate, validated, registerUser);

router.post('/login', validatedUserLogin, validated, loginUser);

router.post('/refresh', refreshAccessToken);

module.exports = router;