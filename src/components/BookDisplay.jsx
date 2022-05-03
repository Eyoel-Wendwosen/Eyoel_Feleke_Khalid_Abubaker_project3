import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router";
import { Container } from "react-bootstrap";

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

  return (
    <Container>
      <h1>Name: {book.name}</h1>
    </Container>
  );
};

export default BookDisplay;
