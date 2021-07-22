const express = require('express')
const orderRouter = express.Router()
const {createOrder,getOrders} = require('../controllers/orderController')
orderRouter
.post('/create',createOrder)


orderRouter
.get('/',getOrders)







module.exports = orderRouter;