/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import "./App.css";
import React from "react";
import io from "socket.io-client";
import { Route } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import SignUp from "./components/Pages/SignUp/SignUp";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Message from "./components/Pages/Message/Message";
import SignIn from "./components/Pages/SignIn/SignIn";
import Contacts from "./components/Pages/Contacts/Contacts";

export const socket = io("https://venv-chat.herokuapp.com");
export const BaseUrl = "https://venv-chat.herokuapp.com";

function App() {
  socket.on("connection", () => {
    // console.log("socket id", socket.id);
    console.log("app connected");
  });

  return (
    <ErrorBoundary>
      <Layout>
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/messages" exact component={Message} />
        <Route path="/sign-up/:token" exact component={SignUp} />
        <Route path="/contacts" exact component={Contacts} />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
