const bcrypt = require('bcrypt')

//Converting passwords in Hash Format
exports.hashPassword = (password)=> bcrypt.hash(password,10)