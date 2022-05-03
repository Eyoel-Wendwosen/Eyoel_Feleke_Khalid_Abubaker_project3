import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import Book from "./Book";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    Axios.get("/api/book/").then(function (response) {
      setBooks(response.data);
    });
  }, []);

  if (!books) {
    return <div>Home loading...</div>;
  }
  console.log(books);
  const getBooks = () => {
    return books.map((book) => (
      <Link to={`/Book/${book._id}`} className="">
        <Book book={book} />
      </Link>
    ));
  };
  return (
    <Container fluid className="books">
      <div className="book-wrapper">
        {getBooks()}
        {getBooks()}
        {getBooks()}
        {getBooks()}
        {getBooks()}
        {getBooks()}
      </div>
    </Container>
  );
};

export default Home;
