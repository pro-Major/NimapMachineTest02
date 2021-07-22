const db = require('../models/index')
const helper = require('../utils/index.js')
const { promisify } = require("util");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const client = require('../redisConnect')
dotenv.config({ path: './.env' })

//middleware to get verify User is registered
exports.AuthorizeUser = async (req, res, next) => {
    try {
        let token;
        
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(400).json({
                message: "Please! Login First to Access Resources."
            })
        }
        let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETKEY);

        console.log("DECODED VALUE", decoded)
        const newUser = await db.User.findByPk(decoded.id);
        if (!newUser) {
            return res.status(400).json({
                message: "User Already Exist."
            })
        }
        req.user = newUser.dataValues;
        req.token = token;
        console.log('BLTOKEN' + decoded.id.toString())

        // Verify with blacklist token
        client.get('BLTOKEN' + decoded.id.toString(), (err, data) => {
            if (err) throw err;

            if (data === token) {
                res.status(500).json({
                    message: "Blacklisted token",
                })
            }
            next();
        })


    } catch (err) {
        res.status(500).json({
            message: "Something went Wrong",
            err: err
        })
    }
}



//Handline User Roles
exports.AccessibleOnlyTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roles)) {
            console.log("ROLE", req.user.roles)
            return res.status(404).json({
                status: "Fail",
                message: "You are not Authorized for this Operation",
            });
        }
        next();
    };
}
