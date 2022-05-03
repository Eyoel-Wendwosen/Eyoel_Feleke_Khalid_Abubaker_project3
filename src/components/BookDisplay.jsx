import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router";
import { Container, Row, Col } from "react-bootstrap";

const BookDisplay = () => {
  const [book, setBook] = useState(undefined);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    Axios.get("/api/book/" + params.id).then(function (response) {
      setBook(response.data);
    });
  }, []);
  console.log(book);

  if (!book) {
    return <div>Book loading...</div>;
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
    <Container>
      {/* <Row className=""> */}
      <div class="book-display">
        {/* <Col xs="4"> */}
        <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388800064l/9648068.jpg" />
        {/* </Col> */}
        {/* <Col> */}
        <div class="book-infos">
          <div>
            <h2>{book.name}</h2>
            <h5>By {book.author}</h5>
            <p>
              Book description with <strong>relevant info</strong>.
            </p>
          </div>
          <div>
            <p>Genre: {book.genre}</p>
            <p>language: {book.language}</p>
            <p>year: {year}</p>
            <p>Number of Pages: {book.pageCount}</p>
          </div>
        </div>
        {/* </Col> */}
      </div>
      {/* </Row> */}
    </Container>
  );
};

export default BookDisplay;
