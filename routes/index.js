const express = require('express');

//Changes the standard app.get and app.use calls to refer to the router
const router = express.Router();

//Route 1 of 7: Redirects routing at the root route to /books
router.get('/', (req, res, next) => {
  res.redirect('/books')
});

module.exports = router;