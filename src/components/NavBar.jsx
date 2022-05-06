import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Image,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "../reducers/authReducer";

const NavBar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const logged = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("/api/user/isLoggedIn").then(function (response) {
      dispatch(loggedIn(response.data));
    });
  }, [dispatch]);

  function logoff() {
    Axios.post("/api/user/logout")
      .then(function (response) {
        dispatch(loggedIn(""));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleSearchInput(e) {
    e.preventDefault();
    setSearchTerm(e.target.value);
    const url = `/api/book/autocomplete?term=${e.target.value}`;
    Axios.get(url)
      .then((response) => {
        setSearchResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSelection(book) {
    setSearchResult([]);
    setSearchTerm("");
    navigate(`/Book/${book._id}`);
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        variant="dark"
        className="navbar-section"
      >
        <Container>
          <Link to={"/"}>
            <Navbar.Brand>
              BOOK <strong>REVIEW</strong>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            {!logged ? (
              <Nav className="nav-links">
                <Nav.Link as={Link} to={"/Login"}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={"/SignUp"}>
                  Sign Up
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="nav-links">
                {/* <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Link onClick={logoff}>Log Out</Nav.Link>
                <Nav.Link as={Link} to={"/CreatePost"}>
                  Add a book
                </Nav.Link>
              </Nav>
            )}
            <div className="position-relative">
              <Form className="">
                <FormControl
                  onChange={(e) => handleSearchInput(e)}
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  className="me-2"
                  aria-label="Search"
                />
                {/* <Button className="search-btn" variant="outline-success">
                Search
              </Button> */}
              </Form>
              <Container className="position-absoulte search-result">
                {searchResult.length > 0 && (
                  <ul>
                    {searchResult.slice(0, 7).map((book) => {
                      return (
                        <li
                          onClick={() => handleSelection(book)}
                          key={book._id}
                        >
                          <Container>
                            <div className="d-flex">
                              <div xs={2}>
                                <Image
                                  className="search-result-image"
                                  src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388800064l/9648068.jpg"
                                  // thumbnail={true}
                                />
                              </div>
                              <div className="d-flex flex-column">
                                <p className="book-title">{book.name}</p>
                                <p className="book-author">By: {book.author}</p>
                              </div>
                            </div>
                          </Container>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Container>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Container className="position-absoulte start-50 z-100 search-result">
        {searchResult.length > 0 && (
          <ul>
            {searchResult.slice(0, 7).map((book) => {
              return (
                <li onClick={() => handleSelection(book)} key={book._id}>
                  <Container>
                    <Row>
                      <Col xs={2}>
                        <Image
                          className="search-result-image"
                          src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388800064l/9648068.jpg"
                          // thumbnail={true}
                        />
                      </Col>
                      <Col>
                        <p className="book-title">{book.name}</p>
                        <p className="book-author">By: {book.author}</p>
                      </Col>
                    </Row>
                  </Container>
                </li>
              );
            })}
          </ul>
        )}
      </Container> */}
    </>
  );
};

export default NavBar;
