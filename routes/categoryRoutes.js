const express = require('express')
const categoryRouter = express.Router()
const {categoryvalidation} = require('../Validations/categoryValidation')
const validationError = require('../middleware/validationError')
const {AuthorizeUser,AccessibleOnlyTo} = require('../middleware/AuthorizeUser')
const {createCategory,GetCategory,RemoveCategory,UpdateCategory,GetCategoryById} = require('../controllers/CategoryController')

categoryRouter
    .post('/',categoryvalidation,validationError,AuthorizeUser,AccessibleOnlyTo('Admin'),createCategory)
    .get('/',GetCategory)

categoryRouter
    .delete('/:id',RemoveCategory)
    .get('/:id',GetCategoryById)
    .put('/:id',AuthorizeUser,AccessibleOnlyTo('Admin'),UpdateCategory)


module.exports = categoryRouter;