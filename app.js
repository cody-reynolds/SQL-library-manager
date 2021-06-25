const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes/index');
const books = require('./routes/books')

const app = express();

const {sequelize} = require('./models/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Delegates routing at the root route to 'routes/index.js' imported above
app.use('/', routes);
app.use('/books', books);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error;
    err.status = 404;
    err.message = "The page you are looking for does not exist!"
  res.status(404).render('page-not-found', {err});
});

// error handler
app.use(function(err, req, res, next) {
  if(err.status === 404){
    console.log('404 handler called')
    res.status(404).render('page-not-found', {err});
  } else {
    console.log(`${err.status} error handler called - Something went wrong on the server`)
    res.status(err.status).render('error', {err});
  }
});

//Tests the connection to the database.
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()

module.exports = app;