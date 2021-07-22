const {createProduct,getProduct,getProductById,deleteProductById,UpdateProductById} = require('../controllers/ProductController')
const {protectTo,restrictTo} = require('../controllers/authController')
const express = require("express")
const productRouter = express.Router()
const {productValidation} = require('../Validations/productValidation')
const validationError = require('../middleware/validationError')
const {AccessibleOnlyTo,AuthorizeUser} = require('../middleware/AuthorizeUser')
productRouter
    .post('/',AuthorizeUser,AccessibleOnlyTo('Supervisor'),createProduct)  
    .get('/',getProduct)

productRouter
    .route('/:id')
    .get(getProductById)
    .delete(deleteProductById)
    .patch(AuthorizeUser,AccessibleOnlyTo('Supervisor'),UpdateProductById)


module.exports = productRouter