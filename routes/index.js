var express = require('express');
var router = express.Router();

//Imports the Book model
const Book = require('../models').Book;

// /* Handler function to wrap each route. */
// function asyncHandler(cb){
//   return async(req, res, next) => {
//     try {
//       await cb(req, res, next)
//     } catch(error){
//       // Forward error to the global error handler
//       next(error);
//     }
//   }
// }


/* GET home page. */
router.get('/', async function(req, res, next) {
  const books = await Book.findAll();
  console.log(books);
  res.json(books);
});

module.exports = router;
