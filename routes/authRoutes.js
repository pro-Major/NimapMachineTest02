const {SignUp,Login} = require('../controllers/authController');
const {authValidation} = require('../Validations/authValidation')
const validationError =  require('../middleware/validationError')

const express = require('express')
const authRouter = express.Router()


authRouter
    .post('/register',authValidation,validationError,SignUp)

authRouter
    .route('/login')
    .post(Login)



module.exports = authRouter
