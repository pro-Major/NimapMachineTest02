const express = require('express');
const ProductRoute = express.Router()

//Importing Product Controllers
const {createProduct,getProduct, getProductByID,deleteProductById,updateProductById} = require('../controllers/ProductController');
const db = require('../models');

ProductRoute.route('/')
.post(createProduct)
.get(getProduct)


ProductRoute.route('/:id')
.get(getProductByID)
.put(updateProductById)
.delete(deleteProductById)



module.exports = ProductRoute;


