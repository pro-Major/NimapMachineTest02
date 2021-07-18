const db = require('../models/index');
const { validationResult, body } = require('express-validator');

//importing bcrypt to convert password into hash format
const bcrypt = require('bcrypt')



//Register a User 
exports.SignUp = async(req,res)=>{
    try {
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

//Login a User 
exports.Login = async(req,res)=> {
    try {
       const { email,password} = req.body;
       if(!email && !password){
           return (
               req.status(400).json({
                   success : false,
                   message : "Please Enter Credentials Carefully!"
               })
           )
       }
       const useremail = await db.User.findOne({where :{email}})
       if(!useremail){
           return(
               res.status(400).json({
                    message:"Email does not exists"                   
               })
           )
       }
       if (!(await bcrypt.compareSync(password,useremail.dataValues.password))){
           return(
               res.status(400).json({
                   message : "Wrong Password Please Try Again."
               })
           )
       }
       res.status(200).send({
        status: "Login Successfully",
        useremail
    })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Internal Server Error "
        })
    }
}