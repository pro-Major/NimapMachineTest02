const express = require('express')
const excelRoute = express.Router()
const excelWorker = require('../controllers/excelController')
let upload = require('../utils/multer.config.js')
 

excelRoute.post('/upload',upload.single("file"), excelWorker.uploadFile);


excelRoute
.get('/allproducts',excelWorker.getProductExcel)


module.exports = excelRoute;