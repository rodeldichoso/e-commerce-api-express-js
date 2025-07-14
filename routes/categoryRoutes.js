const express = require('express');
const router = express.Router();

const { validateCategoryInputs } = require('../middleware/inputValidator/categoryValidator');
const validated = require('../middleware/validate');
const { addCategory, getCategories, getOneCategory, updateCategory, deleteCategory, getAllProductsOfCategory } = require('../controllers/categoryController');
const { authenticateToken } = require('../middleware/authUser');

router.use(authenticateToken);

router.post('/', validateCategoryInputs, validated, addCategory);
router.get('/', getCategories);
router.get('/:category_id', getOneCategory);
router.put('/:category_id', updateCategory);
router.delete('/:category_id', deleteCategory);
router.get('/:category_id/products', getAllProductsOfCategory)

module.exports = router;