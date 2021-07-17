const db = require('../models/index')
const multer = require('multer');
const port = 'http://localhost:5000'

// Storing the image in the folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true); // Accept the file;
    } else {
        cb(null, false); // Rejects the file
    }
};

// to store the image in the destination folder
const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
});


//To create a Products using multer 
exports.createProduct = [uploads.single('Image'), async (req, res) => {
    try {
        const data = await db.Products.create({

            PName: req.body.PName,
            price: req.body.price,
            Image: port + "/uploads/" + req.file.filename,
            CategoryId: req.body.CategoryId
        })
        res.status(200).json({
            success: true,
            data
        })
    }
    catch (err) {
        return res.status(500).json({
            success:false,
            message: "Something went Wrong",
            err: err.name
        })
    }
}]



//Getting Products By ID 
exports.getProductByID = async (req,res)=> {
    try {
        const data = await db.Products.findOne({
            where:{id:req.params.id},
            include: [
                {
                    model: db.Category,
                    attribute: ['CName']
                }
            ]
        });
        if(!data) {
            return (
                res.status(400).json({
                    success : false,
                    message : "Invalid ID"
                })
            )
        }
        return res.status(200).json({
            success : true,
            data
        })
    } catch (error) {
        return (
            res.status(500).json({
                success : false,
                message : "Internal Server Error "
            })
        )           
    }
}

//Deletre a Product by using ID
exports.deleteProductById = async (req,res)=> {
    try {
        const data = await db.Products.destroy({where : {id: req.params.id}});
        if(!data){
            return (
                res.status(400).json({
                    success: false,
                    message: "Invalid Id"
                })
            )
        }
        return (
            res.status(200).json({
                success :true,
                message: "Deleted Successfully"
            })
        )
    } catch (error) {
        return (
            res.status(500).json({
                success : false,
                error: error.errors[0].message
            })
        )
    }
}

//Update a Product By ID
exports.UpdateProductById = [uploads.single('Image'), async (req, res, next) => {
    try {
        const id = req.params.id;
        if (req.file) {
            var data = {
                Image: port + "/uploads/" + req.file.filename,
                ...req.body
            }
        }
        else {
            var data = req.body
        }
        const updatedata = await db.Products.update(data, {
            where: { id: id }
        })
        return res.status(200).json({
            success:true,
            message: "Updated Successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            success:false,
            message: "Internal Server Error",
            err: err.errors[0].message
        })
    }
}
]