const express = require('express');
const router = express.Router();

const { validateCategoryInputs } = require('../middleware/inputValidator/categoryValidator');
const validated = require('../middleware/validate');
const { addCategory } = require('../controllers/categoryController');
const { authenticateToken } = require('../middleware/authUser');

router.use(authenticateToken);

router.post('/', validateCategoryInputs, validated, addCategory);

module.exports = router;