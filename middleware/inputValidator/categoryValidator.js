const { body } = require('express-validator');

const validateCategoryInputs = [
    body('name')
        .notEmpty()
        .withMessage("Category name is required")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Category name must be at least 3 characters long"),

    body('image_url')
        .optional({ nullable: true })
        .isURL()
        .withMessage("Invalid image URL"),

];

module.exports = {
    validateCategoryInputs
}