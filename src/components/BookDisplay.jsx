import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router";
import { Container } from "react-bootstrap";
import Review from "./Review";

const BookDisplay = () => {
  const [book, setBook] = useState(undefined);
  const [reviews, setReviews] = useState(undefined);
  const params = useParams();
  //   console.log(params);

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
  console.log(book);
  console.log(reviews);

  const getReviews = () => {
    return reviews.map((review) => <Review review={review} />);
  };

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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis reprehenderit veniam, dicta nesciunt beatae porro
                praesentium dolorem inventore rem iusto nam vero quo fuga ipsa
                esse, ut hic excepturi? Atque!
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
        <h2>Reviews</h2>
        <div className="reviews-wrapper">
          {getReviews()}
          <Review></Review>
        </div>
      </Container>
    </>
  );
};

export default BookDisplay;
