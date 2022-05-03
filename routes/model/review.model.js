const mongoose = require('mongoose');

const ReviewSchema = require('../schema/review.schema');

const ReviewModel = mongoose.model("review", ReviewSchema);

function createReview(review) {
    return ReviewModel.create(review);
}

function editReviewById(reviewId, review) {
    const query = {
        _id: reviewId
    };

    return ReviewModel.findOneAndUpdate(query, review).exec();
}


function removeReviewById(reviewId) {
    const query = {
        _id: reviewId
    }

    return ReviewModel.findOneAndDelete(query).exec();
}

function getAllReviews() {
    return ReviewModel.find().exec();
}

function getReviewById(id) {
    return ReviewModel.findById(id).exec();
}

function getReviewByBookId(bookId) {
    const query = {
        bookId: bookId
    }

    return ReviewModel.find(query).exec();
}

module.exports = {
    createReview,
    editReviewById,
    removeReviewById,
    getAllReviews,
    getReviewById,
    getReviewByBookId
}