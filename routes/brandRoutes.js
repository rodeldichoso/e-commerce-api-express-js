const express = require('express');
const router = express.Router();

const { validateBrandInputs } = require('../middleware/inputValidator/brandValidator');
const validated = require('../middleware/validate');
const { addBrand, getBrands, getOneBrand, deleteBrand, updateBrand } = require('../controllers/brandController');
const { authenticateToken } = require('../middleware/authUser');

router.use(authenticateToken);

router.post('/', validateBrandInputs, validated, addBrand);
router.get('/', getBrands);
router.get('/:brandId', getOneBrand);
router.delete('/:brandId', deleteBrand);
router.put('/:brandId', updateBrand);

module.exports = router;