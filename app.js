const express = require('express');
const app = express();
let ejs = require('ejs');
const morgan = require('morgan');
var bodyParser = require('body-parser');
// const urlencodedParser = bodyParser.urlencoded({extended:false});
const helmet = require('helmet')
const xss = require('xss-clean')
//Importing All Routes 
const authRouter = require('./routes/authRoutes')
const categoryRouter = require('./routes/categoryRoutes')
const productRouter = require('./routes/productRoutes')
const cartRouter = require('./routes/cartroutes')
const userRouter = require('./routes/visiterRoutes')
const excelRouter = require('./routes/excelRoute')
const orderRouter = require('./routes/orderRoutes')
//Set Templating Engine
app.set('view engine','ejs');



app.use(express.json());
app.use('/uploads/', express.static("uploads"));
app.use(morgan("dev"));
app.use(xss())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }));
//View Routes
app.get('/',(req,res)=> {
    res.render('login')
})
app.get('/register',(req,res)=>{
    res.render('register')
})  


app.use('/api/user', authRouter)
app.use('/api/category', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/visitor', userRouter)
app.use('/api/excel',excelRouter)
app.use('/api/order', orderRouter)





module.exports = app;