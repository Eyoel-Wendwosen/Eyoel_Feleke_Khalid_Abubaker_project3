import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router";
import { Container, Form, Button } from "react-bootstrap";

import Review from "./Review";
import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "../reducers/authReducer";
const BookDisplay = () => {
  const navigate = useNavigate();
  const logged = useSelector((state) => state.auth.value);
  const [book, setBook] = useState(undefined);
  const [reviews, setReviews] = useState(undefined);
  const params = useParams();
  const dispatch = useDispatch();

  const [postUser, setPostUser] = useState("");

  const [newReview, setNewReview] = useState({
    subject: "",
    text: "",
    rating: 0,
    bookId: params.id,
    ownerId: logged.userId,
  });

  useEffect(() => {
    Axios.get("/api/user/isLoggedIn").then(function (response) {
      dispatch(loggedIn(response.data));
    });
  }, [dispatch]);

  // const [reviewChange, setReviewChange] = useState(false);

  function fetchReviews() {
    Axios.get("/api/book/" + params.id + "/review").then(function (response) {
      setReviews(response.data);
    });
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    Axios.get("/api/book/" + params.id).then(function (response) {
      setBook(response.data);
    });
  }, [params]);

  // useEffect(() => {
  //   Axios.get("/api/book/" + params.id + "/review").then(function (response) {
  //     setReviews(response.data);
  //   });
  // }, []);

  function handleReviewChange() {
    fetchReviews();
  }

  useEffect(() => {
    if (!book) {
      return;
    }
    Axios.get("/api/user/" + book.ownerId).then(function (response) {
      setPostUser(response.data);
    });
  }, [book]);

  // console.log(book.ownerId);

  function submitReview() {
    if (!logged) {
      return;
    }

    Axios.post("/api/review/", {
      review: { ...newReview, bookId: params.id, ownerId: logged.userId },
    })
      .then((response) => {
        setReviews((prev) => {
          const updatedReviews = [...prev, response.data];
          return updatedReviews;
        });
      })
      .catch((error) => console.log(error));
  }

  const getReviews = () => {
    return reviews.map((review) => (
      <Review onChange={() => handleReviewChange()} review={review} />
    ));
  };

  if (!book || !reviews) {
    return <div>Page loading...</div>;
  }

  const bookYear = new Date(book.year);
  const year = bookYear.getFullYear();

  const handleRating = (rate) => {
    setNewReview((prev) => ({
      ...prev,
      rating: rate / 2 / 10,
    }));
  };

  function deleteBook() {
    if (!book) {
      return;
    }
    Axios.delete("/api/book/" + book._id)
      .then(function (response) {
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <Container>
        <div className="book-display">
          <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388800064l/9648068.jpg" />
          <div className="info-wrapper">
            <div className="book-infos">
              <div className="left-book-info">
                <h2>{book.name}</h2>
                <h5>By {book.author}</h5>
                <Rating
                  size="1.5em"
                  readonly="true"
                  allowHalfIcon="true"
                  initialValue={book.rating}
                  // ratingValue="2"
                ></Rating>
                <p className="book-desc">{book.description}</p>
              </div>
              <div className="right-book-info">
                <p>Genre: {book.genre}</p>
                <p>Language: {book.language}</p>
                <p>Year: {year}</p>
                <p>Number of Pages: {book.pageCount}</p>
              </div>
            </div>
            <div className="info-bottom">
              <p>Created: {book.createdAt.substring(0, 10)}</p>
              {logged.userId === book.ownerId ? (
                <div className="d-flex gap-2 me-4">
                  <Button
                    as={Link}
                    to={"/EditPost/" + book._id}
                    className="logged-user-btn"
                  >
                    Edit
                  </Button>
                  <Button className="logged-user-btn" onClick={deleteBook}>
                    Delete
                  </Button>
                </div>
              ) : (
                <p>Posted By: {postUser.username}</p>
              )}
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
              <Form.Group className="mb-1">
                <Form.Control
                  type="text"
                  placeholder="subject"
                  onChange={(e) =>
                    setNewReview((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                />
              </Form.Group>
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
              <Form.Group>
                <Rating
                  size="2em"
                  allowHalfIcon="true"
                  onClick={handleRating}
                  readonly={!logged ? true : false}
                  initialValue={0}
                  // ratingValue={rate}
                ></Rating>
              </Form.Group>
              <Button
                className="logged-user-btn"
                type="reset"
                onClick={submitReview}
              >
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
