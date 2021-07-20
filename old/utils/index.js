const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const authController =require('../controllers/authController');




// Create Token
exports.createToken = ({ id, email }) => {
    console.log("ID EMAIL", id, email)
    const token = jwt.sign({ id, email }, process.env.JWT_SECRETKEY, { expiresIn: process.env.JWT_SECRETTIME })
    console.log("HELPER TOKEN", token)
    const refreshtoken = authController.generateRefreshToken(id, email)
    console.log("HELPER REFRESH TOKEN", refreshtoken)
    return { token, refreshtoken };
}

// Verify the user
exports.verifyToken = (token) => {
    console.log("DATA TOKEN", process.env.JWT_SECRETKEY)
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY, { expiresIn: '24h' })
    return decoded;
}
