const db = require('../models/index');
//importing bcrypt to convert password into hash format
const bcrypt = require('bcrypt')

exports.SignUp = async(req,res)=>{
    try {
        const {name,email,password,roles} = req.body;
        console.log(name,email,password,roles)

        //Converting passwords in Hash Format
        let hashPassword =  await bcrypt.hash(password,10)
        const user = await db.User.create({name,email,password:hashPassword,roles})
        return(
            res.status(200).json({
                success:true,
                user
            })
        )
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Registeration Failed',
        })
    }

}