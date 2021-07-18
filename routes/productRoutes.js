const express = require('express');
const ProductRoute = express.Router()
const { body, validationResult } = require('express-validator')

//Importing Product Controllers
const {createProduct,getProduct, getProductByID,deleteProductById,updateProductById} = require('../controllers/ProductController');
const db = require('../models');

ProductRoute.route('/')
.get(getProduct)
.post([
    // body('PName')
    // .notEmpty().withMessage('Product Cannot be Empty'),
    // .exists().withMessage('Product is required')
    
    // .isString().withMessage('Product name must be an string')
    // .trim(),
    // body('price')
    // .exists().withMessage('price is required'),
    // .notEmpty().withMessage('Product Cannot be Empty')
    // .isNumeric().withMessage('Price must be in Number')
    // .trim(),
    // body('Image')
    // .exists().withMessage('Image is required')
    // .notEmpty().withMessage('Image Cannot be Empty'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                errors
            })
            return;
        }
        next()
    },
],createProduct)



ProductRoute.route('/:id')
.get(getProductByID)
.put(updateProductById)
.delete(deleteProductById)



module.exports = ProductRoute;


