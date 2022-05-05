import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Review from "./Review";

const BookDisplay = () => {
  const logged = useSelector((state) => state.auth.value);
  const [book, setBook] = useState(undefined);
  const [reviews, setReviews] = useState(undefined);
  const params = useParams();
  //   console.log(params);

  const [newReview, setNewReview] = useState({
    subject: "",
    text: "",
    rating: "",
    bookId: params.id,
    ownerId: logged.userId,
  });

  useEffect(() => {
    Axios.get("/api/book/" + params.id).then(function (response) {
      setBook(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("/api/book/" + params.id + "/review").then(function (response) {
      setReviews(response.data);
    });
  }, []);

  function submitReview() {
    console.log(logged);
    if (!logged) {
      return;
    }
    // setNewReview((prev) => ({
    //   ...prev,
    //   review: {
    //     ...prev,
    //     bookId: params.id,
    //     ownerId: logged.userId,
    //   },
    // }));
    Axios.post("/api/review/", {
      review: { ...newReview, bookId: params.id, ownerId: logged.userId },
    })
      .then((response) => {
        console.log(response.data);
        setReviews((prev) => {
          const updatedReviews = [...prev, response.data];
          return updatedReviews;
        });
      })
      .catch((error) => console.log(error));
  }

  const getReviews = () => {
    // console.log(reviews);
    return reviews.map((review) => <Review review={review} />);
  };

  //   subject: String,
  // text: String,
  // imageUrl: String,
  // rating: {
  //     type: Number,
  //     default: 0
  // },
  // bookId: String,
  // ownerId: String,
  // createdAt: {
  //     type: Date,
  //     default: Date.now

  if (!book || !reviews) {
    return <div>Page loading...</div>;
  }

  //   name: String,
  // author: String,
  // imageUrl: String,
  // genre: String,
  // pageCount: Number,
  // language: String,
  // year: {
  //     type: Date,
  //     default: Date.now,
  // },
  // rating: Number,
  // ownerId: String

  const bookYear = new Date(book.year);
  const year = bookYear.getFullYear();

  return (
    <>
      <Container>
        <div className="book-display">
          <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388800064l/9648068.jpg" />
          <div className="book-infos">
            <div className="left-book-info">
              <h2>{book.name}</h2>
              <h5>By {book.author}</h5>
              <p className="book-desc">
                {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis reprehenderit veniam, dicta nesciunt beatae porro
                praesentium dolorem inventore rem iusto nam vero quo fuga ipsa
                esse, ut hic excepturi? Atque! */}
                {book.description}
              </p>
            </div>
            <div className="right-book-info">
              <p>Genre: {book.genre}</p>
              <p>Language: {book.language}</p>
              <p>Year: {year}</p>
              <p>Number of Pages: {book.pageCount}</p>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="reviews-top">
          <h2>Reviews</h2>
          <hr />
        </div>

        <div className="reviews-top">
          <h5>Add a written Review</h5>
          <Form>
            <fieldset disabled={!logged ? true : false}>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  id="disabledTextInput"
                  placeholder={
                    !logged
                      ? "Please sign up or login to write a review"
                      : "Your Review"
                  }
                  onChange={(e) =>
                    setNewReview((prev) => ({
                      ...prev,
                      text: e.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Button className="logged-user-btn" onClick={submitReview}>
                Submit
              </Button>
            </fieldset>
          </Form>
        </div>

        <div className="reviews-wrapper">{getReviews()}</div>
      </Container>
    </>
  );
};

export default BookDisplay;
