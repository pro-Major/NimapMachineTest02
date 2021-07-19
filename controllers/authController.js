const db = require('../models/index');
const {createToken} = require('../utils/index');
//importing bcrypt to convert password into hash format
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const redis = require('../redisConnect')




//Register a User 
exports.SignUp = async (req, res) => {
    try {
        const { name, email,number, password, roles } = req.body;
        //Converting passwords in Hash Format
        let hashPassword = await bcrypt.hash(password, 10)
        const user = await db.User.create({ name, email,number, password: hashPassword, roles })
        return (
            res.status(200).json({
                success: true,
                user
            })
        )
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Registeration Failed',
            error: error
        })
    }

}

//Login a User 
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return (
                req.status(400).json({
                    success: false,
                    message: "Please Enter Credentials Carefully!"
                })
            )
        }
        const useremail = await db.User.findOne({ where: { email } })
        if (!useremail) {
            return (
                res.status(400).json({
                    message: "Email does not exists"
                })
            )
        }
        if (!(await bcrypt.compareSync(password, useremail.dataValues.password))) {
            return (
                res.status(400).json({
                    message: "Wrong Password Please Try Again."
                })
            )
        }
        const { token, refreshtoken } = createToken(useremail)
        console.log("token,refreshtoken", token, refreshtoken)

        res.status(200).send({
            status: "Login Successfully",
            token: token,
            refreshtoken: refreshtoken,
            useremail
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error "
        })
    }
}
//Generate Refresh Token
exports.generateRefreshToken = (id, email) => {
    console.log("ID EMAIL IN GENERATE REFRESH", id, email)
    const refreshtoken = jwt.sign({ id, email }, process.env.JWT_REFERESHKEY, { expiresIn: process.env.JWT_REFERESHTIME })
    console.log("REFRESH TOKEN", refreshtoken)

    redis.get(id.toString(), (err, data) => {
        if (err) throw err;
        redis.set(id.toString(), JSON.stringify({ token: refreshtoken }));
    })



    return refreshtoken;
}