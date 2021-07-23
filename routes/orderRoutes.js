const express = require('express')
const orderRouter = express.Router()
const {createOrder,getOrders} = require('../controllers/orderController')
const {AuthorizeUser} = require('../middleware/AuthorizeUser')
orderRouter
.post('/create',AuthorizeUser,createOrder)


orderRouter
.get('/',getOrders)







module.exports = orderRouter;