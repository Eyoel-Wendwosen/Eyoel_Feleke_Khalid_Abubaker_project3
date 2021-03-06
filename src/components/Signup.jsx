import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "../reducers/authReducer";
import { Container, Form, Button } from "react-bootstrap";

export default function SignUp(props) {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  // const [password, setPassword] = useState("");

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    imageUrl: "",
    email: "",
  });

  const logged = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  function createNewUser() {
    Axios.post("/api/user", { user: { ...newUser } })
      .then((response) => {
        dispatch(loggedIn(response));
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  async function handleFileSelect(e) {
    await setSelectedFile(e.target.files[0]);

    const formData = new FormData();

    formData.append("image", selectedFile, selectedFile.name);
    Axios.post("/api/upload", formData)
      .then((response) => {
        console.log(response);
        setNewUser((prev) => ({
          ...prev,
          imageUrl: response.data.url,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <div className="book-form">
        <h3 className="form-header">Sign Up</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="name"
              placeholder="Username"
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="password"
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Text className="text-muted">Profile Image</Form.Text>
            <Form.Control
              onChange={(e) => handleFileSelect(e)}
              type="file"
              placeholder="Image"
            />
          </Form.Group>

          <Button
            className="logged-user-btn"
            variant="primary"
            onClick={createNewUser}
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </Container>
  );
}
