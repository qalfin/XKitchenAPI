const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routers
const userRouter = require('./api/routers/users');
const tableRouter = require('./api/routers/tables');
const categoryRouter = require('./api/routers/categories');
const productRouter = require('./api/routers/products');
const reservationRouter = require('./api/routers/reservations');
const orderRouter = require('./api/routers/orders');

//conect to mongo
//mongoose.connect("mongodb://localhost:27017/XKitchen");
mongoose.connect("mongodb://admin:12345678@ds215739.mlab.com:15739/xkitchen");
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-with, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/api/users', userRouter);
app.use('/api/tables', tableRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/reservations', reservationRouter);
//app.use('/api/orders', orderRouter);


app.use((req, res, next)=>{

   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});


module.exports=app;