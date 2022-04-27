const express = require('express');

const BookModel = require('./model/book.model');

const router = express.Router();

const auth_middleware = require('./middleware/auth_middleware');

router.get('/', function (request, response) {
    return BookModel.getAllBooks()
        .then(allBooks => {
            response.status(200).send(allBooks);
        })
        .catch(error => {
            response.status(500).send(error);
        });
});

router.post('/', function (request, response) {

    const book = request.body.book;
    const userId = request.userId;

    if (!book) {
        response.status(400).send("Incorrect Book Argument");
    }

    const newBook = {
        ...book,
        userId
    }

    return BookModel.createBook(newBook)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(500).send(error)
        });
});

module.exports = router;