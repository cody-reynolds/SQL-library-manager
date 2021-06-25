const express = require('express');
const router = express.Router();

//Imports the Book model
const Book = require('../models').Book;

/* Handler function to wrap each route. */
 function asyncHandler(cb){
   return async(req, res, next) => {
     try {
       await cb(req, res, next)
     } catch(error){
       // Forward error to the global error handler
       next(error);
     }
   }
 }

/* GET books listing. */
router.get('/',  asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('books/index', {books});
}));


router.get('/new_book.html', asyncHandler(async (req, res) => {
    res.render('books/new-book', { book: {}});
}));


module.exports = router;