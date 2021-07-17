const express = require('express');
const categoryRoute = express.Router()


//Importing All Catgeory Controllers
const {createCategory} = require('../controllers/CategoryController')

categoryRoute
.route('/')
.post(createCategory)


module.exports = categoryRoute;