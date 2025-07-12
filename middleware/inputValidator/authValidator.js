const { body } = require('express-validator');
const db = require('../../config/db');

const validateUserCreate = [
    body('first_name')
        .notEmpty()
        .withMessage("First name is required")
        .bail()
        .isLength({ max: 100 })
        .withMessage("First name cannot exceed 100 characters")
        .bail()
        .isLength({ min: 2 })
        .withMessage("First name must be atleast 2 characters"),

    body('first_name')
        .notEmpty()
        .withMessage("Last name is required")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Last name cannot exceed 100 characters")
        .bail()
        .isLength({ min: 2 })
        .withMessage("Last name must be atleast 2 characters"),

    body('contact_number')
        .notEmpty()
        .withMessage("Contact number is required")
        .matches(/^\+639\d{9}$/)
        .withMessage('Contact number must start with +639 and be valid'),

    body('email')
        .isEmail()
        .withMessage("Invalid Email Format")
        .bail()
        .custom(async (value) => {
            const emailExist = await db('users').where({ email: value }).first();
            if (emailExist) {
                throw new Error("Email Already Exists");
            }
        }),

    body('password')
        .isLength({ min: 6 })
        .withMessage("Password must atleast be 6 character long"),

    body('confirm_password')
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Password do not match")
];


const validatedUserLogin = [
    body('email')
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid Email Format")
        .bail()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .custom(async (value) => {
            const foundUser = await db('users').where({ email: value }).first()
            if (!foundUser) {
                throw new Error("Invalid Credentials");
            }
        }),

    body('password')
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 6 })
        .withMessage("Password must atleast 6 characters long")
];
module.exports = { validateUserCreate, validatedUserLogin };