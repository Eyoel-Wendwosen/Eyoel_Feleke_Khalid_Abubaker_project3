const express = require("express");
const auth_middleware = require("./middleware/auth_middleware");

const ReviewModel = require("./model/review.model");
const BookModel = require("./model/book.model");

const router = express.Router();

router.get("/:reviewId", function (request, response) {
  const reviewId = request.params.reviewId;

  return ReviewModel.getReviewById(reviewId)
    .then((review) => {
      response.status(200).send(review);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

router.post("/", auth_middleware, function (request, response) {
  const review = request.body.review;
  return ReviewModel.createReview(review)
    .then((dbResponse) => {
      if (!review.rating) {
        response.status(200).send(dbResponse);
        return;
      }
      return dbResponse;
    })
    .then(async (review) => {
      if (!review) {
        return;
      }

      const bookId = review.bookId;
      const book = await BookModel.getBookById(bookId);
      let { numberOfReviews, rating } = book;

      //   numberOfReviews = numberOfReviews ? numberOfReviews + 1 : 1;
      //   rating = numberOfReviews
      //     ? (rating * numberOfReviews + review.rating) / numberOfReviews
      //     : review.rating;

      rating =
        (rating * numberOfReviews + review.rating) / (numberOfReviews + 1);
      numberOfReviews = numberOfReviews + 1;

      const update = {
        numberOfReviews,
        rating,
      };

      await BookModel.editBookById(bookId, update);
      response.status(200).send(review);
    })
    .catch((error) => {
      response.status(400).send(error);
    });
});

// router.put("/:reviewId", auth_middleware, function (request, response) {
//   const reviewId = request.params.reviewId;

//   if (!reviewId || reviewId === "") {
//     response.status(400).send("invalid reviewId");
//     return;
//   }

//   const review = request.body.review;

//   if (!review) {
//     response.status(400).send("invalid review object");
//     return;
//   }

//   //   section to handle rating update on delete ##################
//   ReviewModel.getReviewById(reviewId).then((dbResponse) => {
//     const oldReview = dbResponse;

//     const bookId = dbResponse.bookId;
//     // console.log(bookId);

//     if (oldReview.rating) {
//       BookModel.getBookById(bookId).then((dbResponse) => {
//         //   console.log(dbResponse);
//         let { numberOfReviews, rating } = dbResponse;
//         rating =
//           (rating * numberOfReviews - oldReview.rating) / (numberOfReviews - 1);
//         numberOfReviews = numberOfReviews - 1;
//         if (review.rating) {
//           rating =
//             (rating * numberOfReviews + review.rating) / (numberOfReviews + 1);
//           numberOfReviews = numberOfReviews + 1;
//         }

//         const update = {
//           numberOfReviews,
//           rating,
//         };
//         BookModel.editBookById(bookId, update)
//           .then((dbResponse) => {
//             return ReviewModel.editReviewById(reviewId, review).then(
//               (dbResponse) => {
//                 response.status(200).send(dbResponse);
//               }
//             );
//           })
//           .catch((error) => {
//             response.status(500).send(error);
//           });
//       });
//     }
//   });
router.put("/:reviewId", auth_middleware, async function (request, response) {
  const reviewId = request.params.reviewId;
  if (!reviewId || reviewId === "")
    return response.status(400).send("invalid reviewId");

  const review = request.body.review;
  if (!review) return response.status(400).send("invalid review object");

  //   section to handle rating update on delete ##################
  try {
    const oldReview = await ReviewModel.getReviewById(reviewId);
    const book = await BookModel.getBookById(oldReview.bookId);

    let { numberOfReviews, rating: bookRating } = book;

    if (oldReview.rating) {
      bookRating =
        bookRating * numberOfReviews - oldReview.rating / (numberOfReviews - 1);
      // to handle -Infinity case
      if (bookRating < 0) bookRating = 0;
      numberOfReviews = numberOfReviews - 1;
    }

    if (review.rating) {
      bookRating =
        (bookRating * numberOfReviews + review.rating) / (numberOfReviews + 1);
      numberOfReviews = numberOfReviews + 1;
    }

    const updatedBook = await BookModel.editBookById(book._id, {
      numberOfReviews,
      rating: bookRating,
    });
    const updatedReview = await ReviewModel.editReviewById(reviewId, review);
    return response.status(200).send(updatedReview);
  } catch (error) {
    console.log("[ERROR][PUT][/:reviewId]", error);
    return response.status(500).send(error);
  }

  //   ###################################

  //   return ReviewModel.editReviewById(reviewId, review)
  //     .then((dbResponse) => {
  //       response.status(200).send(dbResponse);
  //     })
  //     .catch((error) => {
  //       response.status(500).send(error);
  //     });
});

router.delete("/:reviewId", auth_middleware, function (request, response) {
  const reviewId = request.params.reviewId;

  if (!reviewId || reviewId === "") {
    response.status(400).send("invalid reviewId");
    return;
  }

  //   section to handle rating update on delete ##################

  ReviewModel.getReviewById(reviewId).then((dbResponse) => {
    const review = dbResponse;
    if (!dbResponse.bookId) {
      return ReviewModel.editReviewById(reviewId, review)
        .then((dbResponse) => {
          response.status(200).send(dbResponse);
        })
        .catch((error) => {
          response.status(500).send(error);
        });
    }
    const bookId = dbResponse.bookId;
    // console.log(bookId);

    if (review.rating) {
      BookModel.getBookById(bookId).then((dbResponse) => {
        //   console.log(dbResponse);
        let { numberOfReviews, rating } = dbResponse;
        if (numberOfReviews > 1) {
          rating =
            (rating * numberOfReviews - review.rating) / (numberOfReviews - 1);
          numberOfReviews = numberOfReviews - 1;
        } else {
          rating = 0;
          numberOfReviews = numberOfReviews - 1;
        }
        const update = {
          numberOfReviews,
          rating,
        };
        BookModel.editBookById(bookId, update)
          .then((dbResponse) => {
            return ReviewModel.removeReviewById(reviewId).then((dbResponse) => {
              response.status(200).send(dbResponse);
            });
          })
          .catch((error) => {
            response.status(500).send(error);
          });
      });
    }
  });
  //   ###################################

  //   return ReviewModel.removeReviewById(reviewId)
  //     .then((dbResponse) => {
  //       response.status(200).send(dbResponse);
  //     })
  //     .catch((error) => {
  //       response.status(500).send(error);
  //     });
});

module.exports = router;
