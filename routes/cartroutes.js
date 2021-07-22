const {AuthorizeUser} = require("../middleware/AuthorizeUser")
const {createCart,getCartUser} = require('../controllers/CartController')
const express = require('express')
const cartRouter = express.Router()


cartRouter
    .route('/:productid')
    .post(AuthorizeUser,createCart)

cartRouter
    .route('/getCart')
    .get(AuthorizeUser,getCartUser)





module.exports = cartRouter