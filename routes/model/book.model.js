const mongoose = require('mongoose');

const BookSchema = require('../schema/book.schema');

const BookModel = mongoose.model("book", BookSchema);

function createBook(book) {
    return BookModel.create(book);
}

function getBooksByUsername() {
    // return BookModel.find({
        
    // }).exec();
}

function getAllBooks() {
    return BookModel.find().exec();
}

function getBookById(id) {
    return BookModel.findById(id).exec();
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    getBooksByUsername,
}