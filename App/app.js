let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://node:node.js@cluster0-rykxu.mongodb.net/test?retryWrites=true',{useNewUrlParser: true})
    .then(()=> console.log("Todo Database Connected"))
    .catch(error => {
        console.log('Connection FAILED');
        console.log(error);
    });
console.log('> Connecting to dependencies');
console.log('> index.js C:/Users/manan/downloads/app/routes/');
console.log('> schema.js C:/Users/manan/downloads/app/schema/');
console.log('> schema2.js  C:/Users/manan/downloads/app/schema/');
console.log('> www.js C:/Users/manan/downloads/app/bin');
let indexRouter = require('./routes/index.js');

let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todo', indexRouter);
// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
    next(createError(404));
});
*/
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;