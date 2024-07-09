const Book = require('./Model/Book');
const books = [
    new Book('9780743273565', 'The Great Gatsby', 'F. Scott Fitzgerald', 1925),
    new Book('9780446310789', 'To Kill a Mockingbird', 'Harper Lee', 1960),
    new Book('9780451524935', '1984', 'George Orwell', 1949)
  ];

const createBook = async (req, res, next) => {
    try {
        const {isbn, title, author, publicationYear} = req.body;
        const book = new Book(isbn, title, author, publicationYear);
        books.push(book);
        res.status(201).json(book);
    } catch(error) {
        next(error);
    }
};

const getAllBooks = async(req, res) => {
    res.status(200).json(books);
}

const getBookById = async(req, res, next) => {
    try {
        const bookId = req.params.id;

        const foundBook = books.find(book => book.isbn == bookId)   
        if(foundBook){
            res.status(200).json(foundBook);
        } else {
            const error = new Error('Book not found');
            error.status = 404;
            return next(error);
        }
    } catch(error) {
        next(error);
    }
}

const updateBook = async(req, res, next) => {
    try {
        const bookId = req.params.id;
        const {isbn, title, author, publicationYear} = req.body;
        const updatedBook = new Book(isbn, title, author, publicationYear);

        const foundBookID = books.findIndex(book => book.isbn == bookId)   
        if(foundBookID !== -1){
            books[foundBookID] = updatedBook;
            res.status(200).json(updatedBook);
        } else {
            const error = new Error('Book not found');
            error.status = 404;
            return next(error);
        }
    } catch(error) {
        next(error);
    }
}

const deleteBook = async(req, res, next) => {
    const bookId = req.params.id;
    try {
        const foundBookID = books.findIndex(book => book.isbn == bookId)   
        if(foundBookID !== -1){
            books.splice(foundBookID, 1);
            res.json({ message: 'User deleted successfully' });
        } else {
            const error = new Error('Book not found');
            error.status = 404;
            return next(error);
        }
    } catch(error) {
        next(error);
    }
}

module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };