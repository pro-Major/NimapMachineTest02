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
const catrouter = require('./routes/categoryRoutes')
const productroute = require('./routes/productRoutes')
const cartroute = require('./routes/cartroutes')
const visitroutes = require('./routes/visiroRoutes')
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
app.use('/api/category', catrouter)
app.use('/api/products', productroute)
app.use('/api/cart', cartroute)
app.use('/api/visitor', visitroutes)
//app.use('/api/orders', orderroute)





module.exports = app;