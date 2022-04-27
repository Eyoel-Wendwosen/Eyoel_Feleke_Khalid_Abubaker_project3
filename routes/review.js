const express = require('express');
const auth_middleware = require('./middleware/auth_middleware');

const ReviewModel = require('./model/review.model');

const router = express.Router();


router.get('/', auth_middleware, function(request, response) {

    const username = request.username;

    return ReviewModel.getReviewsByUsername(username)
        .then(allReviews => {
            response.status(200).send(allReviews)
        })
        .catch(error => {
            response.status(400).send(error)
        })

})

router.get('/:reviewId', function(request, response) {

    const reviewId = request.params.reviewId

    return ReviewModel.getReviewById(reviewId)
        .then(review => {
                response.status(200).send(review);
        })
        .catch(error => {
            response.status(400).send(error);
        });
});

router.post('/', function(request, response) {
    const review = request.review;

    return ReviewModel.createReview(review)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
});

module.exports = router;