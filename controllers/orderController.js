const express = require('express')
const db = require('../models')

exports.createOrder = async (req, res) => {
    try {
        const data = await db.Order.create({
            user: req.body.user,
            product: req.body.product,
            quantity: req.body.quantity
        })
        res.status(200).json({
            orderSuccess: true,
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            orderSuccess: false,
            error: error.name,

        })

    }
}

exports.getOrders = async (req, res) => {
    try {
        const data = await db.Order.findAndCountAll({
         include : [{
            model: db.User,

         }]
        })
        res.status(200).json({
            success: true,
            TotalOrders: data.count,
            Orders: data.rows
        })
    } catch (error) {
        console.log(error)

        return res.status(404).json({
            message: "Something went wrong ",
            error: error.name
        })
    }
}