const express = require('express')
const userRouter = express.Router()

const {VerifyRefreshToken,logoutFunction} = require('../controllers/authController')
const {getMe,dashboard,GetVerificationToken} = require('../controllers/userController')
const {AuthorizeUser} = require('../middleware/AuthorizeUser')

userRouter
    .route('/getMe')
    .get(AuthorizeUser,getMe)

userRouter
    .route('/dashboard')
    .get(AuthorizeUser,dashboard)

userRouter
    .route('/token')
    .post(VerifyRefreshToken,GetVerificationToken)

userRouter
    .route('/logout')
    .get(AuthorizeUser,logoutFunction)


module.exports = userRouter