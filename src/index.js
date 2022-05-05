import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Popper from "popper.js";
import "./assets/index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// ReactDOM.render(
//   <div>
//     <BrowserRouter>
//       {/* {NavBar goes here} */}
//       {/* <NavBar /> */}
//       <Routes>
//         {/* <Route path={"/"} element={<App />} />
//         <Route path={"/home/:homeId"} element={<HomeEntry />} />
//         <Route path={"/login"} element={<Login />} />
//         <Route path={"/signup"} element={<SignUp />} /> */}
//       </Routes>
//     </BrowserRouter>
//   </div>
//   , document.getElementById('root')
// );
