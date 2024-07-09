const express = require('express')
const router = express.Router()
const {createBook, getBookById, updateBook, deleteBook, getAllBooks} = require('./BookController');


router.route('/').post(createBook).get(getAllBooks);
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;