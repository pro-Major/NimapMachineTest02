const db = require('../models/index');

exports.getUser =async(req,res)=> {
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