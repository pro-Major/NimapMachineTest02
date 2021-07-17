const express = require('express');
const app = express();

//Importing All Routes 
const ProductRoute = require('./routes/productRoutes')




//Importing Inbuilt Middlewares
app.use(express.json());






//Using Routes 
app.get('/',(req,res)=> {
    res.send('Hello How Are You Developer?');
})

app.use('/api/products',ProductRoute);









module.exports = app;