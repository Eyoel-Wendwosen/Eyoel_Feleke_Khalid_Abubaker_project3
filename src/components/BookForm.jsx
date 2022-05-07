import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const BookForm = () => {
  const navigate = useNavigate();
  const logged = useSelector((state) => state.auth.value);

  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    description: "",
    imageUrl: "",
    genre: "",
    pageCount: "",
    language: "",
    year: "",
    ownerId: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const params = useParams();

  // if (!params.bookId) {
  //   setNewBook({
  //     name: "",
  //     description: "",
  //     imageUrl: "",
  //     genre: "",
  //     pageCount: "",
  //     language: "",
  //     year: "",
  //     ownerId: "",
  //   });
  // }

  function getBook() {
    Axios.get("/api/book/" + params.bookId).then(function (response) {
      setNewBook(response.data);
    });
  }
  //   if (!logged || logged.userId !== params.newBook.ownerId) {
  //     return;
  //   }

  useEffect(() => {
    if (!params.bookId) {
      setNewBook({
        name: "",
        author: "",
        description: "",
        imageUrl: "",
        genre: "",
        pageCount: "",
        language: "",
        year: "",
        ownerId: "",
      });
      return;
    }

    getBook();
  }, [params.bookId]);

  function submitBook() {
    if (!logged) {
      return;
    }

    Axios.post("/api/book/", {
      book: { ...newBook, ownerId: logged.userId },
    })
      .then((response) => {
        navigate(`/Book/${response.data._id}`);
      })
      .catch((error) => console.log(error));
  }

  function editBook() {
    if (!logged) {
      return;
    }
    Axios.put("/api/book/" + newBook._id, {
      book: { ...newBook },
    })
      .then(function (response) {
        navigate(`/Book/${newBook._id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function handleFileSelect(e) {
    await setSelectedFile(e.target.files[0]);

    const formData = new FormData();

    formData.append("image", selectedFile, selectedFile.name);
    Axios.post("/api/upload", formData)
      .then((response) => {
        console.log(response);
        setNewBook((prev) => ({
          ...prev,
          imageUrl: response.data.url,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
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
        <h3 className="form-header">
          {params.bookId ? "Edit Book" : "Add a new book"}
        </h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="name"
              placeholder="Book Name"
              value={newBook.name}
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
              value={newBook.author}
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
              value={newBook.genre}
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
              value={newBook.language}
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
              value={newBook.year}
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
              value={newBook.pageCount}
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
              value={newBook.description}
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
            <Form.Control
              onChange={(e) => handleFileSelect(e)}
              type="file"
              placeholder="Image"
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button
              className="logged-user-btn"
              variant="primary"
              onClick={params.bookId ? editBook : submitBook}
            >
              Submit
            </Button>
            <Button
              className="logged-user-btn"
              variant="primary"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default BookForm;
