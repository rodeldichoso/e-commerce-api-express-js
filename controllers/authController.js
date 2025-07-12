const bcrypt = require('bcrypt');
const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();


/**
 * Handle User Registration
 * 
 * @param {Object} req - Express request object
 * @param {string} req.body.name - User's name
 * @param {string} req.body.email - User's Email
 * @param {string} req.body.password - User's Password
 * @param {Object} res - Express response object
 * @returns {Promise<void>} -  Returns access token and user info on successful registration
 */
const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, contact_number, email, password } = req.body;

        //Hash and make a uuid
        const uuid = uuidv4();
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));

        //Insert to database table
        await db('users').insert({
            user_id: uuid,
            last_name,
            first_name,
            contact_number,
            email,
            password: hashedPassword
        });

        //Sign a new access token
        const accessToken = jwt.sign({
            userId: uuid, name: `${first_name} ${last_name}`
        }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_AT });

        //Sign a new refresh token
        const refreshToken = jwt.sign({
            userId: uuid, name: `${first_name} ${last_name}`
        }, process.env.REFRESH_JWT_SECRET_KEY, { expiresIn: process.env.REFRESH_JWT_EXPIRES_AT });

        //Set the cookie with refresh token
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        });

        //Respond with user info and token
        return res.status(201).json({
            msg: "User created successfully",
            user: {
                user_id: uuid,
                first_name: first_name,
                last_name: last_name,
                contact_number: contact_number,
                email: email
            },
            access_token: accessToken
        });

    }
    //If error happen this will catch
    catch (error) {
        console.error("Error", error);
        return res.status(500).json({ msg: "Something went wrong registering your account" });
    }
};

/**
 * Handle User Login
 * 
 * @param {Object} req - Express request object
 * @param {string} req.body.email - User's Email
 * @param {string} req.body.password - User's Password
 * @param {Object} res - Express response object 
 * @returns {Promise<void>} - Returns access token and user info on successful registration
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db('users').where({ email }).first();

        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const accessToken = jwt.sign({
            userId: user.user_id, name: `${user.first_name} ${user.last_name}`
        }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_AT });

        const refreshToken = jwt.sign({
            userId: user.user_id, name: `${user.first_name} ${user.last_name}`
        }, process.env.REFRESH_JWT_SECRET_KEY, { expiresIn: process.env.REFRESH_JWT_EXPIRES_AT });

        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
        });

        const response = {
            msg: "Login Successful",
            user: {
                userId: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name
            },
            access_token: accessToken
        };
        if (process.env.NODE_ENV === 'development') {
            response.refresh_token = refreshToken;
        }

        return res.status(200).json(response);

    }

    catch (error) {
        console.error("Error", error);
        return res.status(500).json({ error: "Something went wrong Logging in" })
    }
}


/**
 * Handle refreshing the access token.
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.cookies - Cookies sent with the request
 * @param {string} req.cookies.refresh_token - Refresh token stored in HTTP-only cookie
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Responds with a new access token or an error
 */
const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET_KEY);
        const newAccessToken = jwt.sign({
            userId: decoded.userId,
            firstName: decoded.firstName,
            lastName: decoded.lastName
        }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_AT });

        return res.status(200).json({
            access_token: newAccessToken
        })

    }
    catch (error) {
        console.error("Error", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken
};

