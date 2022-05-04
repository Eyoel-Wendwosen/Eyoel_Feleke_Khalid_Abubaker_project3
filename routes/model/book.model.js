const mongoose = require('mongoose');

const BookSchema = require('../schema/book.schema');

const BookModel = mongoose.model("book", BookSchema);

function createBook(book) {
    return BookModel.create(book);
}

function editBookById(bookId, book) {
    const query = {
        _id: bookId
    }

    return BookModel.findOneAndUpdate(query, book).exec();
}

function getAllBooks() {
    return BookModel.find().exec();
}

function getBooksByUserId(userId) {
    const query = {
        ownerId: userId
    }

    return BookModel.find(query).exec();
}

function getBookById(id) {
    return BookModel.findById(id).exec();
}

function removeBookById(id) {
    return BookModel.findOneAndDelete(id).exec();
}

function searchBook(query) {
    const pipeline = [
        {
            $search: {
                index: "searchBook",
                text: {
                    query: query,
                    path: {
                        'wildcard': "*"
                    }
                }
            }
        }
    ]

    return BookModel.aggregate(pipeline).exec();
}

module.exports = {
    createBook,
    editBookById,
    removeBookById,
    getAllBooks,
    getBookById,
    getBooksByUserId,
    searchBook
}