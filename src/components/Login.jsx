import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "../reducers/authReducer";
import { Container, Form, Button } from "react-bootstrap";

export default function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logged = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  function submitLogin() {
    Axios.post("/api/user/authenticate", { user: { username, password } })
      .then((response) => {
        dispatch(loggedIn(response));
        console.log(logged);
        navigate(-1);
      })
      .catch((error) => console.log(error));
  }

  return (
    <Container>
      <div className="book-form">
        <h3 className="form-header">Login</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="name"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className="logged-user-btn"
            variant="primary"
            onClick={submitLogin}
          >
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}
