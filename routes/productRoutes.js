const express = require('express');
const ProductRoute = express.Router()

//Importing Product Controllers
const {createProduct,responseOP} = require('../controllers/ProductController')

ProductRoute.route('/')
.get(responseOP)
.post(createProduct)


module.exports = ProductRoute;
