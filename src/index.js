import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeEntry from './HomeEntry';
import Login from './Login';
import SignUp from './Signup';
import NavBar from './NavBar';

ReactDOM.render(
  <div>
    <BrowserRouter>
      {/* {NavBar goes here} */}
      <NavBar />
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/home/:homeId"} element={<HomeEntry />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </div>
  , document.getElementById('root')
);
