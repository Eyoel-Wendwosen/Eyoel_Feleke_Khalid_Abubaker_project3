const express = require('express');
const auth_middleware = require('./middleware/auth_middleware');

const ReviewModel = require('./model/review.model');
const BookModel = require('./model/book.model');

const router = express.Router();


router.get('/:reviewId', function (request, response) {

    const reviewId = request.params.reviewId

    return ReviewModel.getReviewById(reviewId)
        .then(review => {
            response.status(200).send(review);
        })
        .catch(error => {
            response.status(400).send(error);
        });
});

router.post('/', auth_middleware, function (request, response) {
    const review = request.body.review;

    return ReviewModel.createReview(review)
        .then(dbResponse => {
            if (!review.rating) {
                response.status(200).send(dbResponse);
                return;
            }
            return dbResponse;
        }).then(async review => {

            if (!review) {
                return;
            }

            const bookId = review.bookId;
            const book = await BookModel.getBookById(bookId);
            let { numberOfReviews, rating } = book;

            numberOfReviews = numberOfReviews ? numberOfReviews + 1 : 1;
            rating = numberOfReviews ? (rating * numberOfReviews + review.rating) / numberOfReviews : review.rating;

            const update = {
                numberOfReviews,
                rating
            }

            await BookModel.editBookById(bookId, update);
            response.status(200).send(review);
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

router.put('/:reviewId', auth_middleware, function (request, response) {
    const reviewId = request.params.reviewId;

    if (!reviewId || reviewId === '') {
        response.status(400).send("invalid reviewId");
        return;
    }

    const review = request.body.review;

    if (!review) {
        response.status(400).send("invalid review object");
        return;
    }

    return ReviewModel.editReviewById(reviewId, review)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(500).send(error);
        });
});

router.delete('/:reviewId', auth_middleware, function (request, response) {

    const reviewId = request.params.reviewId;

    if (!reviewId || reviewId === '') {
        response.status(400).send("invalid reviewId");
        return;
    }

    return ReviewModel.removeReviewById(reviewId)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(500).send(error);
        });
});

module.exports = router;