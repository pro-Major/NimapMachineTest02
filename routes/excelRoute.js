const express = require('express')
const excelRoute = express.Router()
const multer = require('multer');
const {uploadMultipleFiles,getProductExcel} = require('../controllers/excelController')
// Storing the image in the folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
       cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
  });   
const upload = multer({storage: storage});



excelRoute
.route('/upload')
.post(upload.array('files', 4),uploadMultipleFiles);


excelRoute
.route('/allproducts')
.get(getProductExcel)


module.exports = excelRoute;