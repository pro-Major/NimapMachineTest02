const db = require('../models/index')

exports.createCart = async (req, res) => {
    try {
        if (!req.body.user) {
            req.body.user = req.user.id
        }
        if (req.body.quantity === 0) {
            return res.status(400).json({
                message: "Cart Cannot be empty"
            })
        }
        var cartdata = await db.Cart.create({
            userid: req.user.id,
            productid: req.params.productid * 1,
            quantity: req.body.quantity,
        })

        console.log("Data", cartdata)
        return res.status(200).json({
            status: "Cart Added Successfully",
            cartdata
        })
    }
    catch (err) {
        res.status(400).json({
            status: "Something went wrong",
            err: err.name
        })
    }
}


exports.getCartUser = async (req, res) => {
    try {
        const usercartdata = await db.Cart.findAll(
            {
                where: { userid: req.user.id },
                include: [
                    {
                        model: db.Products,
                        attributes: ['PName', 'price'],
                        include: [
                            {
                                model: db.Category,
                                attributes: ['CName']
                            }
                        ]
                    },
                    {
                        model: db.User,
                        attributes: ['name']
                    }
                ]
            })

        if (usercartdata.length === 0) {
            return res.status(200).json({
                message: "Cart is empty"
            })
        }
        res.status(200).json({
            users: usercartdata
        })
    } catch (err) {
        return res.status(500).json({
            message: 'Something went wrong',
            err: err
        })
    }
}