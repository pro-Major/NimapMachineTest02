const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const express = require('express')
const userroutes = express.Router()

userroutes
    .route('/getMe')
    .get(
        authController.protectTo,
        userController.getMe
    )

userroutes
    .route('/dashboard')
    .get(
        authController.protectTo,
        userController.dashboard
    )

userroutes
    .route('/token')
    .post(
        authController.VerifyRefreshToken,
        userController.GetVerificationToken
    )

userroutes
    .route('/logout')
    .get(
        authController.protectTo,
        authController.logoutFunction
    )



module.exports = userroutes