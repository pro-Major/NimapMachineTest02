const db = require('../models/index');
const jwt = require('jsonwebtoken')
const authController = require('../controllers/authController')
exports.getMe =async(req,res)=> {
    try {
        const userdata = await db.User.findOne({where : {id:req.user.id}})
        return res.status(200).json({
            userdata:userdata
        })
        
    }   catch (error) {
        return res.status(500).json({
            success : false,
            status: "Internal Server Error",
            error: error
        })
    }
}

exports.dashboard = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Hello from the dashboard"
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err: err
        })
    }
}

exports.GetVerificationToken = async (req, res) => {
    try {
        const email = req.user.email;
        const id = req.user.id;
        const token = jwt.sign({ id, email }, process.env.JWT_SECRETKEY, { expiresIn: process.env.JWT_SECRETTIME })
        const refreshtoken = authController.generateRefreshToken(id, email)
        return res.status(200).json({
            message: "Success",
            data: {
                token: token,
                refreshtoken: refreshtoken
            }
        })
    } catch (err) {
        return res.status(500).json({
            err: err
        })
    }
}

