const validator = require('validator')
const db = require('../models/index')


exports.authValidation = async (req, res, next) => {
    const { email, password, name } = req.body

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: 'Please Write the proper email address'
        })
    }
    if (!email) {
        return res.status(400).json({
            message: 'Please Enter the Email'
        })
    }

    if (!password) {
        return res.status(400).json({
            message: 'Please Enter the Password'
        })
    }

    if (!name) {
        return res.status(400).json({
            message: 'Please Enter the Name'
        })
    }

    const user = await db.User.findOne({ where: { email } })
    if (user) {
        return res.status(400).json({
            message: "User is Already Present"
        })
    }
    next()
}