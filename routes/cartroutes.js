const authController = require('../controllers/authController')
const cartController = require('../controllers/CartController')
const express = require('express')
const cartroute = express.Router()


cartroute
    .route('/:productid')
    .post(
        authController.protectTo,
        cartController.createCart
    )

cartroute
    .route('/getCart')
    .get(
        authController.protectTo,
        cartController.getCartUser
    )





module.exports = cartroute