import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router";

const BookForm = () => {
  const navigate = useNavigate();
  const logged = useSelector((state) => state.auth.value);
  const [newBook, setNewBook] = useState({
    name: "",
    description: "",
    imageUrl: "",
    genre: "",
    pageCount: "",
    language: "",
    year: "",
    ownerId: "",
  });

  function submitBook() {
    if (!logged) {
      return;
    }

    Axios.post("/api/book/", {
      book: { ...newBook, ownerId: logged.userId },
    })
      .then((response) => {
        console.log(response.data);
        navigate(`/Book/${response.data._id}`);
      })
      .catch((error) => console.log(error));
  }
  // name: String,
  // description: String,
  // author: String,
  // imageUrl: String,
  // genre: String,
  // pageCount: Number,
  // language: String,
  // year: {
  //     type: Date,
  //     default: Date.now,
  // },
  // rating: {
  //     type: Number,
  //     default: 0
  // },
  // numberOfReviews: {
  //     type: Number,
  //     default: 0
  // },
  // ownerId: String,
  // createdAt: {
  //     type: Date,
  //     default: Date.now
  // }
  return (
    <Container>
      <div className="book-form">
        <h3 className="form-header">Add a new book</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="name"
              placeholder="Book Name"
              onChange={(e) =>
                setNewBook((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="name"
              placeholder="Book Author"
              onChange={(e) =>
                setNewBook((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Book Genre"
              onChange={(e) =>
                setNewBook((prev) => ({
                  ...prev,
                  genre: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Book Language"
              onChange={(e) =>
                setNewBook((prev) => ({
                  ...prev,
                  language: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="date"
              //   defaultValue={Date.now.getFullYear}
              placeholder="Book Year"
              onChange={(e) =>
                setNewBook((prev) => ({
                  ...prev,
                  year: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Book Page Count"
              onChange={(e) =>
                setNewBook((prev) => ({
                  ...prev,
                  pageCount: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              type="textarea"
              placeholder="Book Description"
              onChange={(e) =>
                setNewBook((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Text className="text-muted">Book Cover Image</Form.Text>
            <Form.Control type="file" placeholder="Image" />
          </Form.Group>

          <Button
            className="logged-user-btn"
            variant="primary"
            onClick={submitBook}
          >
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default BookForm;
