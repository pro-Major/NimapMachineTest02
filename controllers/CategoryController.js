const db = require('../models/index')


exports.createCategory = async (req,res)=> {
    try{
        let data = await db.Category.create({
            CName:req.body.CName
        })
        return(
            res.status(200).json({
                succes : true,
                message :"Category Added Successfully",
                category:data
            })
        )

    }
    catch(error){
        res.status(200).json({
            succes : false,
            message : "Somethin went wrong",
            error: error.errors[0].message
        })
    }
    

}