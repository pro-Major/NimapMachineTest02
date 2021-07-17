const db = require('../models/index')

exports.createProduct = async (req,res)=> {
    try {
        const data = await db.Products.create({
            PName:req.body.PName,
            price:req.body.body,
            CategoryId:req.body.CategoryId
        })
        res.status(200).json({
            success : true,
            data
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went Wrong",
            err: err.name
        })
    }
}
exports.responseOP = async (req,res)=> {
    res.status(200).json({
        success : true
    })
}