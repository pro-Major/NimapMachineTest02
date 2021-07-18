const express = require('express');
const AuthRoute = express.Router();
const {SignUp,Login} = require('../controllers/authController')
const { ValidatorOP } = require('../middleware/validators');

AuthRoute
.route('/register')
.post(ValidatorOP,SignUp,)

AuthRoute
.route('/login')
.post(Login)


module.exports=AuthRoute;