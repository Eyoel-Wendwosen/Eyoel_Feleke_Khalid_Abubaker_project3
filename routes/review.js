const { response } = require('express');
const express = require('express');
const auth_middleware = require('./middleware/auth_middleware');

const ReviewModel = require('./model/review.model');

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
    const review = request.review;

    return ReviewModel.createReview(review)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
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