import React from 'react';
import ReactDOM from 'react-dom';
import App from './old/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeEntry from './old/HomeEntry';
import Login from './old/Login';
import SignUp from './old/Signup';
import NavBar from './old/NavBar';

ReactDOM.render(
  <div>
    <BrowserRouter>
      {/* {NavBar goes here} */}
      {/* <NavBar /> */}
      <Routes>
        {/* <Route path={"/"} element={<App />} />
        <Route path={"/home/:homeId"} element={<HomeEntry />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<SignUp />} /> */}
      </Routes>
    </BrowserRouter>
  </div>
  , document.getElementById('root')
);
