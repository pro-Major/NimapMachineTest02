const express = require('express');
const app = express();
let ejs = require('ejs');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:false});
//Importing All Routes 
const ProductRoute = require('./routes/productRoutes');
const CategoryRoute = require('./routes/categoryRoutes');
const AuthRoute = require('./routes/authRoutes');
const visitroutes = require('./routes/visiroRoutes')

//Set Templating Engine
app.set('view engine','ejs');

//Importing  Middlewares
app.use(express.json());
app.use('/uploads/', express.static("uploads"));
app.use(morgan("dev"));


//View Routes
app.get('/',(req,res)=> {
    res.render('login')
})
app.get('/register',(req,res)=>{
    res.render('register')
})  


app.use('/api/products',ProductRoute);
app.use('/api/category',CategoryRoute);
app.use('/api/user',urlencodedParser,AuthRoute);
app.use('/api/visitor', visitroutes)






module.exports = app;