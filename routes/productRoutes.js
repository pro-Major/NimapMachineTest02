const express = require('express');
const ProductRoute = express.Router()

//Importing Product Controllers
const {createProduct, getProductByID,deleteProductById,UpdateProductById} = require('../controllers/ProductController');
const db = require('../models');

ProductRoute.route('/')
.post(createProduct)



ProductRoute.route('/:id')
.get(getProductByID)
.delete(deleteProductById)
.put(UpdateProductById)
module.exports = ProductRoute;


