const express = require('express');
const app = express();


const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routers
const userRouter = require('./api/routers/users');

//conect to mongo
mongoose.connect("mongodb://localhost:27017/XKitchen");
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/users', userRouter);

app.use((req, res, next)=>{

   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});


module.exports=app;