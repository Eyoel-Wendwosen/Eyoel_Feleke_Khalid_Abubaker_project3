const Schema = require('mongoose').Schema;

const ReviewSchema = new Schema({
    subject: String,
    text: String,
    imageUrl: String,
    rating: {
        type: Number,
        default: 0
    },
    bookId: String,
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'review',
})

module.exports = ReviewSchema;