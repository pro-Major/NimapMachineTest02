const express = require('express')
const userroutes = express.Router()
const {protectTo,VerifyRefreshToken,logoutFunction} = require('../controllers/authController')
const {getMe,dashboard,GetVerificationToken} = require('../controllers/userController')


userroutes
    .route('/myprofile')
    .get(protectTo,getMe)

userroutes
    .route('/dashboard')
    .get(protectTo,dashboard)

userroutes
    .route('/token') 
    .post(VerifyRefreshToken,GetVerificationToken)

userroutes
    .route('/logout')
    .get(protectTo,logoutFunction)



module.exports = userroutes