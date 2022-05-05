import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "../reducers/authReducer";

export default function SignUp(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logged = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  function createNewUser() {
    Axios.post("/api/user", { user: { username, password } })
      .then((response) => {
        console.log("Created user");
        console.log(response.data);
        dispatch(loggedIn(response));
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h1>Create User</h1>
      <h5>Username</h5>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <h5>Password</h5>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={createNewUser}>Create User</button>
    </div>
  );
}
