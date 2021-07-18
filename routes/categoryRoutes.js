const express = require('express');
const categoryRoute = express.Router()
const { body , validationResult } = require('express-validator')


//Importing All Catgeory Controllers
const {createCategory, getCategory, getCategoryById,deleteCategoryById,updateCategory} = require('../controllers/CategoryController')

categoryRoute
.route('/')
.get(getCategory)
.post(
    [
        body('CName')
        
        .notEmpty().withMessage('Category Cannot be Empty')
        .exists().withMessage('Category is required')
        .isString().withMessage('Category name must be an string')
        .trim(),
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
    ]
    
    ,createCategory)


categoryRoute
.route('/:id')
.delete(deleteCategoryById)
.get(getCategoryById)
.put(updateCategory)


module.exports = categoryRoute;