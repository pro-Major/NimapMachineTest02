const express = require('express');
const AuthRoute = express.Router();
const {SignUp} = require('../controllers/authController')
AuthRoute
.route('/register')
.post(SignUp)



module.exports=AuthRoute;