import React from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
const NavBar = () => {
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
            <Nav className="nav-links">
              <Nav.Link as={Link} to={"/Login"}>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to={"/SignUp"}>
                Sign Up
              </Nav.Link>
            </Nav>
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
