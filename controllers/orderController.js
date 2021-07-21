const express = require('express')
const db = require('../models')

exports.createOrder = async(req,res)=> {
    try {
        const data = await db.Order.create({
            user : req.body.user,
            product: req.body.product,
            quantity: req.body.quantity
        })
        res.status(200).json({
            orderSuccess : true,
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            orderSuccess : false,
            error : error.name,
            
        })
        
    }
}

exports.getOrder = async(req,res)=> {
    
}