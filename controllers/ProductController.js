const multer = require('multer')
const Excel = require('exceljs')
const db = require('../models/index')
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

exports.createProduct = [uploads.single('Image'), async (req, res) => {
    try {
        const data = await db.Products.create({
            PName: req.body.PName,
            price: req.body.price,
            Image: port + "/uploads/" + req.file.filename,
            CategoryId: req.body.CategoryId
        })
        res.status(200).json({
            status: "Successfully Addded",
            data
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Something went Wrong",
            err: err.name
        })
    }
}]



exports.getProduct = async (req, res) => {
    try {

        const getPagination = (page, size) => {
            const limit = size ? +size : 5;
            const offset = page ? page * limit : 0;
            return { limit, offset };
        };


        const getPagingData = (data, page, limit) => {
            const { count: totalItems, rows: products } = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
            return { totalItems, products, totalPages, currentPage };
        };

        const condition = req.query.price ? { price: req.query.price } : {}
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size)

        const data = await db.Products.findAndCountAll({
            where: condition,
            limit: limit,
            offset: offset,
            include: [
                {
                    model: db.Category,
                    attribute: ['CName']
                }
            ]
        })
        const { products } = getPagingData(data, page, limit)
        res.status(200).json({
            status: "All Products",
            products
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Something went Wrong"
        })
    }
}


exports.getProductById = async (req, res) => {
    try {
        const data = await db.Products.findByPk(req.params.id);
        if (!data) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }
        return res.status(200).json({ data })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err: err
        })
    }
}


exports.deleteProductById = async (req, res) => {
    try {
        const data = await db.Products.destroy({ where: { id: req.params.id } });
        if (!data) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }
        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err: err.errors[0].message
        })
    }
}


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
        console.log(data)
        const updatedata = await db.Products.update(data, {
            where: { id: id }
        })
        return res.status(200).json({
            message: "Updated Successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal Server Error",
            err: err.errors[0].message
        })
    }
}
]


