const express = require("express");

const BookModel = require("./model/book.model");
const ReviewModel = require("./model/review.model");

const router = express.Router();

const auth_middleware = require("./middleware/auth_middleware");

// get all books
router.get("/", function (request, response) {
  return BookModel.getAllBooks()
    .then((allBooks) => {
      response.status(200).send(allBooks);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
});

// get book by bookId
router.get("/:bookId", function (request, response) {
  const bookId = request.params.bookId;

  if (!bookId || bookId === "") {
    response.status(400).send("invalid book id");
    return;
  }

  return BookModel.getBookById(bookId)
    .then((dbResponse) => {
      response.status(200).send(dbResponse);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
});

// Authorized accesses
// create book
router.post("/", function (request, response) {
  const book = request.body.book;
  const userId = request.userId;

  if (!book) {
    response.status(400).send("incorrect book argument");
    return;
  }

  const newBook = {
    ...book,
    ownerId: userId,
  };

  return BookModel.createBook(newBook)
    .then((dbResponse) => {
      response.status(200).send(dbResponse);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
});

// edit book
router.put("/:bookId", function (request, response) {
  const bookId = request.params.bookId;
  const book = request.body.book;

  if (!bookId || bookId === "") {
    response.status(400).send("invalid book id");
    return;
  }

  return BookModel.editBookById(bookId, book)
    .then((updatedBook) => {
      response.status(200).send(updatedBook);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
});

// delete book
router.delete("/:bookId", function (request, response) {
  const bookId = request.params.bookId;

  if (!bookId || bookId === "") {
    response.status(400).send("invalid book id");
    return;
  }

  return BookModel.removeBookById(bookId)
    .then((dbResponse) => {
      response.status(200).send(dbResponse);
    })
    .catch((error) => {
      response.send(500).send(error);
    });
});

// get reviews of a specific book
router.get("/:bookId/review", function (request, response) {
  const bookId = request.params.bookId;

  if (!bookId || bookId === "") {
    response.status(400).send("invalid book id");
    return;
  }

  return ReviewModel.getReviewByBookId(bookId)
    .then((dbResponse) => {
      response.status(200).send(dbResponse);
    })
    .catch((error) => {
      response.status(500).send(error);
    });
});

module.exports = router;
