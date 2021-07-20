const {createCategory,GetCategory,RemoveCategory,UpdateCategory,GetCategoryById} = require('../controllers/CategoryController')
const {protectTo,restrictTo} = require('../controllers/authController')
const express = require('express')
const catrouter = express.Router()

catrouter
    .route('/')
    .post(restrictTo('Admin'),createCategory)
    .get(GetCategory)

catrouter
    .route('/:id')
    .delete(protectTo,restrictTo('Admin'),RemoveCategory)
    .get(GetCategoryById)
    .put(protectTo,restrictTo('Admin'),UpdateCategory)


module.exports = catrouter;