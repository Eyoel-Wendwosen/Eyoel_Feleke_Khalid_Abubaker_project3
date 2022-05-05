import Axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "../reducers/authReducer";

const NavBar = () => {
  const logged = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  function logoff() {
    Axios.post("/api/user/logout")
      .then(function (response) {
        dispatch(loggedIn(""));
      })
      .catch(function (error) {
        console.log(error);
      });
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
                <Nav.Link onClick={logoff}>Log Out</Nav.Link>
              </Nav>
            )}

            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button className="search-btn" variant="outline-success">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
