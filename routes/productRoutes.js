const {createProduct,getProduct,getProductById,deleteProductById,UpdateProductById} = require('../controllers/ProductController')
const {protectTo,restrictTo} = require('../controllers/authController')
const express = require("express")
const productroute = express.Router()

productroute
    .route('/')
    .post(protectTo,restrictTo('Supervisor'),createProduct) 
    .get(getProduct)

productroute
    .route('/:id')
    .get(getProductById)
    .delete(
        protectTo,restrictTo('Supervisor'),deleteProductById)
    .patch(
        protectTo,restrictTo('Supervisor'),UpdateProductById)


module.exports = productroute