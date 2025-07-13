const { body } = require('express-validator');
const db = require('../../config/db');

const existsInTable = (table, column) => {
    return async (value) => {
        const result = await db(table).where({ [column]: value }).first();
        if (!result) throw new Error(`${column} does not exist in ${table}`);
    };
};

const validateProductInputs = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .bail()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters'),

    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters'),

    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .bail()
        .isFloat({ min: 0.01 })
        .withMessage('Price must be at least 0.01'),

    body('discount_price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Discount price must be a valid number'),

    body('category_id')
        .notEmpty()
        .withMessage('Category is required')
        .bail()
        .custom(existsInTable('categories', 'category_id')),

    body('image_url')
        .notEmpty()
        .withMessage('Image URL is required')
        .bail()
        .isURL().withMessage('Invalid image URL'),

    body('brand_id')
        .optional()
        .bail()
        .custom(existsInTable('brands', 'brand_id')),

    body('stock_quantity')
        .notEmpty()
        .withMessage('Stock is required')
        .bail()
        .isInt({ min: 0 })
        .withMessage('Stock must be at least 1'),
];

module.exports = {
    validateProductInputs,
};
