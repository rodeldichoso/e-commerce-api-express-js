const { body } = require('express-validator');

const validateBrandInputs = [
    body('brand_name')
        .notEmpty()
        .withMessage('Brand Name is required')
        .bail()
        .isLength({ max: 50 })
        .withMessage('Brand Name must be less than 50 characters'),


    body('logo_url')
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage("Logo URL must be a valid url")
];


module.exports = { validateBrandInputs };