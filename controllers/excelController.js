const db = require("../models/index");
const Excel = require('exceljs')


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

















exports.uploadMultipleFiles = async (req, res) => {
	const messages = [];

	for (const file of req.files) {
        try{
            let filePath = __basedir + "/uploads/" + file.filename;
            let rows = await readXlsxFile(filePath);
    
            // `rows` is an array of rows
            // each row being an array of cells.   
            console.log(rows);
    
            // Remove Header ROW
            rows.shift();
            
            const Products = [];
    
            let length = rows.length;
    
            for(let i=0; i<length; i++){
    
                let Products = {
                    id: rows[i][0],
                    name: rows[i][1],
                    address: rows[i][2],
                    age: rows[i][3]
                }
    
                customers.push(customer);
            }
    
            uploadResult = await Customer.bulkCreate(customers);
    
            // It will now wait for above Promise to be fulfilled and show the proper details
            console.log(uploadResult);
    
            if (!uploadResult){
                const result = {
                    status: "fail",
                    filename: file.originalname,				
                    message: "Can NOT upload Successfully",
                }
    
                messages.push(result);
            } else {
                const result = {
                    status: "ok",
                    filename: file.originalname,
                    message: "Upload Successfully!",
                }
                messages.push(result);
            }                   
        }catch(error){
            const result = {
                status: "fail",
                filename: file.originalname,				
                message: "Error -> " + error.message
            }

            messages.push(result);
        }
	}

	return res.json(messages);
}