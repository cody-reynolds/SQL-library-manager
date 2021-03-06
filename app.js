const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

//Imports the route files
const routes = require('./routes/index');
const books = require('./routes/books')

//Imports the instance of sequelize instantiated in index.js within the models folder
const {sequelize} = require('./models/index');

//View engine setup
//Tells the app the 'views' folder is the starting point for all the view templates3
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Tells the app the 'public' folder is the starting point for all the static assets
app.use(express.static(path.join(__dirname, 'public')));

//Delegates routing at the root route to 'routes/index.js' imported above
app.use('/', routes);
//Delegates routing from /books path to 'routes/books.js' imported above
app.use('/books', books);

//Catches 404 errors
app.use(function(req, res, next) {
  console.log('404 error handler called')
  const err = new Error;
    err.status = 404;
    err.message = "Sorry! We couldn't find the page you were looking for."
  res.status(404).render('page-not-found', {err});
});

//Global error handler
app.use(function(err, req, res, next) {
  console.log('Global error handler called')
  if(err.status === 404){
    res.status(404).render('page-not-found', {err});
  } else {
    const status = err.status || 500;
    res.status(status);
    res.render('error', {err});
  }
});

module.exports = app;