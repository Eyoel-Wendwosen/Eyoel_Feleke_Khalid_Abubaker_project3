import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { loggedIn } from "../reducers/authReducer";

export default function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logged = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  function createNewUser() {
    Axios.post("/api/user/authenticate", { user: { username, password } })
      .then((response) => {
        dispatch(loggedIn(response));
        console.log(logged);
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h5>Username</h5>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <h5>Password</h5>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={createNewUser}>Login</button>
    </div>
  );
}
