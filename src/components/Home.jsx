import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import Book from "./Book";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const Home = () => {
  const [books, setBooks] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    Axios.get("/api/book/").then(function (response) {
      setBooks(response.data.reverse());
    });
  }, []);

  if (!books) {
    return <div>Home loading...</div>;
  }

  const getBooks = () => {
    // books.sort((a, b) => b.year - a.year);
    return books.map((book) => (
      <Link to={`/Book/${book._id}`}>
        <Book book={book} />
      </Link>
    ));
  };
  return (
    <Container fluid className="books">
      <div className="book-wrapper">{getBooks()}</div>
    </Container>
  );
};

export default Home;
