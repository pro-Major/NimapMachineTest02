const express = require('express');
const AuthRoute = express.Router();
const { SignUp, Login } = require('../controllers/authController');
const { body, validationResult } = require('express-validator')

AuthRoute
    .route('/register')
    .post(
    [
        body('email').trim().isEmail().withMessage('Email is not valid ')
        .normalizeEmail().toLowerCase(),
        body('password').trim().isLength(2).withMessage('Password min length 2'),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    success: false,
                    errors
                })
                return;
            }
            next()
        },
    ], 
    SignUp)

AuthRoute
    .route('/login')
    .post(Login)


module.exports = AuthRoute;