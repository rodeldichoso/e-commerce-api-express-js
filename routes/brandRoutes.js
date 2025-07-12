const express = require('express');
const router = express.Router();

const { validateBrandInputs } = require('../middleware/inputValidator/brandValidator');
const validated = require('../middleware/validate');
const { addBrand, getBrands, getOneBrand, deleteBrand, updateBrand } = require('../controllers/brandController');
const { authenticateToken } = require('../middleware/authUser');

router.use(authenticateToken);

router.post('/', validateBrandInputs, validated, addBrand);
router.get('/', getBrands);
router.get('/:brand_id', getOneBrand);
router.delete('/:brand_id', deleteBrand);
router.put('/:brand_id', updateBrand);

module.exports = router;