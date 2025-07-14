const express = require('express');
const router = express.Router();

const { validateProductInputs } = require('../middleware/inputValidator/productValidator');
const validated = require('../middleware/validate');
const { addProduct, getProduct, getOneProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticateToken } = require('../middleware/authUser');

router.use(authenticateToken);

router.post('/', validateProductInputs, validated, addProduct);
router.get('/', getProduct);
router.get('/:product_id', getOneProduct);
router.put('/:product_id', updateProduct);
router.delete('/:product_id', deleteProduct);

module.exports = router;