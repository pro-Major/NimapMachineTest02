const {SignUp,Login} = require('../controllers/authController');
const {authValidation} = require('../Validations/authValidation')
const express = require('express')
const authRouter = express.Router()


authRouter
    .route('/register')
    .post(authValidation,SignUp)

authRouter
    .route('/login')
    .post(Login)



module.exports = authRouter
