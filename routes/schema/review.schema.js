const Schema = require('mongoose').Schema;

const ReviewSchema = new Schema({
    subject: String,
    text: String,
    imageUrl: String,
    rating: Number,
    bookId: String,
    ownerId: String
}, {
    collection: 'review',
})

module.exports = ReviewSchema;