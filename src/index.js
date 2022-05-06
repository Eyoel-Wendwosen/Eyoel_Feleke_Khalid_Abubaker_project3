import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";

import "./assets/index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
