const express = require('express');
const AuthRoute = express.Router();
const { SignUp, Login } = require('../controllers/authController');
const { body, validationResult } = require('express-validator')

AuthRoute
    .route('/register')
    .post(
    [  
        body('email').trim()
        .notEmpty().withMessage('Email Cannot be empty ')
        .isEmail().withMessage('Please Write proper Email. ')
        .normalizeEmail().toLowerCase(),
        body('number').trim().isNumeric().isMobilePhone().withMessage("Mobile Number is Not Valid"),
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
    .post(
        [
            body('email').trim()
            .notEmpty().withMessage('Email Cannot be empty ')
            .isEmail().withMessage('Please Write proper Email. ')
            .normalizeEmail().toLowerCase(),
            body('password')
            .trim()
            .isLength(2).withMessage('Password min length 2'),
    
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
        Login)


module.exports = AuthRoute;

// isMobilePhone: {
//     options: ['en-US'],
//     errorMessage: 'Must provide a valid US phone number.'
//   },
//   errorMessage: 'Must provide a valid phone number.'
// }