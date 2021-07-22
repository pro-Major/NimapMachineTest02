const express = require('express')
const excelRouter = express.Router()
const excelWorker = require('../controllers/excelController')
let upload = require('../utils/multer.config.js')
 

excelRouter.post('/upload',upload.single("file"), excelWorker.uploadFile);


excelRouter
.get('/allproducts',excelWorker.getProductExcel)


module.exports = excelRouter;