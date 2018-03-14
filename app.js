const express = require('express');
const app = express();


const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routers
const userRouter = require('./api/routers/users');
const tableRouter = require('./api/routers/tables');
const categoryRouter = require('./api/routers/categories');
const productRouter = require('./api/routers/products');

//conect to mongo
mongoose.connect("mongodb://localhost:27017/XKitchen");
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/tables', tableRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

app.use((req, res, next)=>{

   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});


module.exports=app;