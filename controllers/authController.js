const db = require('../models/index')
const helper = require('../utils/index.js')
const { promisify } = require("util");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const client = require('../redisConnect')
dotenv.config({ path: './.env' })




exports.SignUp = async (req, res, next) => {
    try {
        const { name, email, password, roles } = req.body;
        const hash = await helper.hashPassword(password)
        const user = await db.User.create({ name, email, password: hash, roles })
        return res.status(200).send({ user })
    } catch (err) {
        res.status(400).json({
            message: 'Failed'
        })
    }

}

exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(400).json({
                message: "Enter the password and email"
            })
        }
        const useremail = await db.User.findOne({ where: { email } })
        if (!useremail) {
            return res.status(400).json({
                message: "Email not exists"
            })
        }
        if (!(await helper.comparePassword(password, useremail.dataValues.password))) {
            return res.status(400).json({
                message: "Password is incorrect"
            })
        }
        const { token, refreshtoken } = helper.createToken(useremail)

        console.log("token,refreshtoken", token, refreshtoken)

        res.status(200).send({
            status: "Login Successfully",
            token: token,
            refreshtoken: refreshtoken,
            useremail
        })

    } catch (e) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

exports.protectTo = async (req, res, next) => {
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
                message: "Please Login First"
            })
        }
        let decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETKEY);

        console.log("DECODED VALUE", decoded)
        const freshUser = await db.User.findByPk(decoded.id);
        if (!freshUser) {
            return res.status(400).json({
                message: "User is not present"
            })
        }
        req.user = freshUser.dataValues;
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


exports.VerifyRefreshToken = async (req, res, next) => {
    try {
        const token = req.body.token;
        if (token === null) {
            return res.status(400).json({
                status: false,
                message: "Invalid Request",
            })
        }

        let decoded = await promisify(jwt.verify)(token, process.env.JWT_REFERESHKEY);
        console.log("DECODED VALUE", decoded)
        const freshUser = await db.User.findByPk(decoded.id);
        req.user = freshUser.dataValues;

        // Verify if token is in store or not
        client.get(decoded.id.toString(), (err, data) => {
            if (err) throw err;

            if (data === null) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid Request"
                })
            }

            if (JSON.parse(data).token !== token) {
                return res.status(400).json({
                    status: false,
                    message: "Your token is not same as token stored in"
                })
            }
            next();
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Your session is not valid",
            data: err

        })
    }

}

exports.generateRefreshToken = (id, email) => {
    console.log("ID EMAIL IN GENERATE REFRESH", id, email)
    const refreshtoken = jwt.sign({ id, email }, process.env.JWT_REFERESHKEY, { expiresIn: process.env.JWT_REFERESHTIME })
    console.log("REFRESH TOKEN", refreshtoken)

    client.get(id.toString(), (err, data) => {
        if (err) throw err;
        client.set(id.toString(), JSON.stringify({ token: refreshtoken }));
    })



    return refreshtoken;
}

exports.logoutFunction = async (req, res) => {
    try {
        const email = req.user.email;
        const id = req.user.id;
        const token = req.token;
        console.log("EMAIL", email)
        console.log('BLTOKEN LOGOUT' + id.toString())

        await client.del(id.toString());

        // Blacklist token
        await client.set('BLTOKEN' + id.toString(), token);


        return res.status(200).json({
            status: "Logout Success"
        })
    } catch (err) {
        return res.status(500).json({
            err: err
        })
    }

}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roles)) {
            console.log("ROLE", req.user.roles)
            return res.status(404).json({
                status: "Fail",
                message: "You do not have permission",
            });
        }
        next();
    };
}
