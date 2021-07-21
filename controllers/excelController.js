const db = require("../models/index");
const Excel = require('exceljs')
const port = 'http://localhost:5000'
const readXlsxFile = require('read-excel-file/node')

exports.getProductExcel = async (req,res)=> {
    try {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Product Excel')
        worksheet.columns = [
            {
                header: 'ID', key: 'id', width: 20
            },
            {
                header: 'Product Name', key: 'PName', width: 20
            },
            {
                header: 'Price', key: 'price', width: 20
            },
            {
                header: 'Image', key: 'Image', width: 40
            },
            {
                header: 'Category', key: 'CategoryId', width: 20
            }
        ]
        let count = 1;
        const pdata = await db.Products.findAll({})
        pdata.forEach(product => {
            worksheet.addRow(product)
            count += 1;
        });
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true }
        })
        const wexcel = await workbook.xlsx.writeFile(`${__dirname}/Product.xlsx`)
        console.log("TRUEs")
        res.status(200).json({
            status: "Excel file Generated successfully",
            pdata
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Something went Wrong"
        })
    }
}

exports.uploadFile = (req, res) => {

    try{
        let filePath = port+"/uploads/" + req.file.filename;

        readXlsxFile(filePath).then(rows => {
            // `rows` is an array of rows
            // each row being an array of cells.   
            console.log(rows);
    
            // Remove Header ROW
            rows.shift();
            
            const products = [];
    
            let length = rows.length;
    
            for(let i=0; i<length; i++){
    
                let product = {
                    PName: rows[i][0],
                    price: rows[i][1],
                    Image: rows[i][2],
                    CategoryId: rows[i][3]
                }
    
                products.push(product);
            }
    
            Products.bulkCreate(products).then(() => {
                const result = {
                    status: "ok",
                    filename: req.file.originalname,
                    message: "Upload Successfully!",
                }
        
                res.json(result);
            });
        });
    }catch(error){
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error
        }
        res.json(result);
    }
}