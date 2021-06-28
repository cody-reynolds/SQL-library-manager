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

 //Route 2 of 7: Show (GET) the full list of books
router.get('/',  asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render('books/index', {books});
}));

//Route 3 of 7: Show (GET) the create new book form
router.get('/new', asyncHandler(async (req, res) => {
    res.render('books/new-book', { book: {}});
}));

//Route 4 of 7: POST a new book to the database
router.post('/', asyncHandler(async (req, res) => { //Why does the route have to be the root?
    let book;
    try {
        book = await Book.create(req.body);
        res.redirect("/books");
    } catch {
        if(error.name === 'SequelizeValidationError') {
            book = await Book.build(req.body);
            res.render("books/new-book", {book, errors: error.errors})
        } else {
            throw error;
        }
    }
}));

//Route 5 of 7: Show (GET) book detail form
router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if(book){
        res.render("books/update-book", {book})
    } else {
        res.sendStatus(404);
    }
}));

//Route 6 of 7: Update (POST) book info from the database
router.post('/:id', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id);
        if (book) {
            await book.update(req.body);
            res.redirect("/books");
        } else {
            res.sendStatus(404);
        }
     } catch (error) {
            if(error.name === "SequelizeValidationError") {
                book = await Book.build(req.body);
                book.id = req.params.id;
                res.render(`books/${req.params.id}/edit`, {book, errors: error.errors})
            } else {
                throw error;
            }
        }
}));


//Route 7 of 7: Delete a book from the database
router.post('/:id/delete', asyncHandler(async (req ,res) => {
    const book = await Book.findByPk(req.params.id)
    if(book){
      await book.destroy();
      res.redirect("/books");
    } else {
      res.sendStatus(404);
    }
  }));

module.exports = router;