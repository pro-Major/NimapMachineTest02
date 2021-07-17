const express = require('express');
const app = express();

//Importing All Routes 
const ProductRoute = require('./routes/productRoutes')
const CategoryRoute = require('./routes/categoryRoutes')




//Importing Inbuilt Middlewares
app.use(express.json());
app.use('/uploads/', express.static("uploads"))






//Using Routes 
app.get('/',(req,res)=> {
    res.send('Hello! How Are You Developer?');
})

app.use('/api/products',ProductRoute);
app.use('/api/category',CategoryRoute);









module.exports = app;