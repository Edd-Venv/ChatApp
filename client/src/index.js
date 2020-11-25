import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/auth/authContext";

if (!localStorage.getItem("userImage") || !localStorage.getItem("username")) {
  localStorage.setItem("userImage", "default.jpg");
  localStorage.setItem("username", "Guest");
}

const app = (
  <HashRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </HashRouter>
);

ReactDOM.render(app, document.getElementById("root"));
