const express = require('express');
const router = express.Router();

const { validateProductInputs } = require('../middleware/inputValidator/productValidator');
const validated = require('../middleware/validate');
const { addProduct } = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authUser');

router.use(authenticateToken);

router.post('/', validateProductInputs, validated, addProduct);

module.exports = router;