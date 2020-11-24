import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/auth/authContext";

if (!localStorage.getItem("userImage") || !localStorage.getItem("username")) {
  localStorage.setItem("userImage", "default.jpg");
  localStorage.setItem("username", "Guest");
}

const app = (
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));
