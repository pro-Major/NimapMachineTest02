const {createProduct,getProduct,getProductById,deleteProductById,UpdateProductById} = require('../controllers/ProductController')
const {protectTo,restrictTo} = require('../controllers/authController')
const {productValidation} = require('../Validations/productValidation')
const validationError = require('../middleware/validationError')
const express = require("express")
const productroute = express.Router()

productroute
    .post('/',productValidation,createProduct)  //protectTo,restrictTo('Supervisor'),
    .get('/',protectTo,getProduct)

productroute
    .route('/:id')
    .get(getProductById)
    .delete(
        protectTo,restrictTo('Supervisor'),deleteProductById)
    .patch(
        protectTo,restrictTo('Supervisor'),UpdateProductById)


module.exports = productroute