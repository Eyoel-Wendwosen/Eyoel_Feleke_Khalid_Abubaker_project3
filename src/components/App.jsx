import React from "react";
import NavBar from "./NavBar";
import Home from "./Home";
import BookDisplay from "./BookDisplay";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/Book/:id"} element={<BookDisplay />} />
          {/* <Route path={"/Game/:difficulty"} element={<WordGrid />} /> */}
          {/* <Route path={"/Rules"} element={<Rules />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
