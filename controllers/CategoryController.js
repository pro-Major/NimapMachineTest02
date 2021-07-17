const db = require('../models/index')

//Creating a Category 
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

//Getting All category 
exports.getCategory = async(req,res)=>{
    try {
        const data = await db.Category.findAndCountAll({ 
        })
        return(
        res.status(200).json({
            succes:true,
            data
        })
        )
       
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}

//Getting a Single Category 
exports.getCategoryById = async (req,res)=>{
    try {
        let data = await db.Category.findByPk(req.params.id);
        if(!data){
            return res.status(400).json({
                success:false,
                message:"Invalid Id"
            })
        }
        return(
            res.status(200).json({
            success:true,
            data
        })
        )
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}

//Delete a Category 
exports.deleteCategoryById= async (req, res, next) => {
    try {
        const removedata = await db.Category.destroy({ where: { id: req.params.id } })
        if (removedata === 0) {
            return res.status(400).json({
                message: `Category do not exist!`,
            })
        }
        return res.status(200).json({
            succes:true,
            status: "Category deleted Successfully",
        })
    }
    catch (err) {
        res.status(500).json({
            status: "Failed",
            err: err
        })
    }
}

exports.updateCategory = async (req, res, next) => {
    try {
        
        const updatadata = await db.Category.update({
            CName: req.body.CName
        }, { where: { id: req.params.id } })

        if (updatadata.includes(0)) {
            return res.status(400).json({
                message: `Category with that id =${req.params.id} does not exists!`,
            })
        }
        return res.status(200).json({
            message: "Category Updated Successfully",
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            err: err.errors[0].message
        })
    }
}

