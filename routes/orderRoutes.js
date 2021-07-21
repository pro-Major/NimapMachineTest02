const express = require('express')
const orderRoute = express.Router()
const {createOrder,getOrders} = require('../controllers/orderController')
orderRoute
// .post('/create',createOrder)


orderRoute
// .get('/',getOrders)







module.exports = orderRoute;