const {createCategory,GetCategory,RemoveCategory,UpdateCategory,GetCategoryById} = require('../controllers/CategoryController')
const {protectTo,restrictTo} = require('../controllers/authController')
const express = require('express')
const catrouter = express.Router()
const {categoryvalidation} = require('../Validations/categoryValidation')
const validationError = require('../middleware/validationError')
catrouter
    .post('/',categoryvalidation,validationError,createCategory)
    .get('/',GetCategory)

catrouter
    .delete('/:id',RemoveCategory)
    .get('/:id',GetCategoryById)
    .put('/:id',UpdateCategory)


module.exports = catrouter;