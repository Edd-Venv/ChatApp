import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

if (!localStorage.getItem("userImage") || !localStorage.getItem("username")) {
  localStorage.setItem("userImage", "default.jpg");
  localStorage.setItem("username", "Guest");
}

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));
