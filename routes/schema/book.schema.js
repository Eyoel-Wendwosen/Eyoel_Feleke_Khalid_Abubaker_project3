const Schema = require('mongoose').Schema;

const BookSchema = new Schema({
    name: String,
    description: String,
    author: String,
    imageUrl: String,
    genre: String,
    pageCount: Number,
    language: String,
    year: {
        type: Date,
        default: Date.now,
    },
    rating: Number,
    ownerId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'book',
})

module.exports = BookSchema;