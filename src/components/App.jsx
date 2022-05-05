import React from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import BookDisplay from "./BookDisplay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup";
import BookForm from "./BookForm";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/Book/:id"} element={<BookDisplay />} />
          <Route path={"/Login"} element={<Login />} />
          <Route path={"/SignUp"} element={<SignUp />} />
          <Route path={"/CreatePost"} element={<BookForm />} />
          {/* <Route path={"/Game/:difficulty"} element={<WordGrid />} /> */}
          {/* <Route path={"/Rules"} element={<Rules />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
