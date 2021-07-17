const express = require('express');
const categoryRoute = express.Router()


//Importing All Catgeory Controllers
const {createCategory, getCategory, getCategoryById,deleteCategoryById,updateCategory} = require('../controllers/CategoryController')

categoryRoute
.route('/')
.get(getCategory)
.post(createCategory)


categoryRoute
.route('/:id')
.delete(deleteCategoryById)
.get(getCategoryById)
.put(updateCategory)


module.exports = categoryRoute;