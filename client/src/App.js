/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import "./App.css";
import React from "react";
import io from "socket.io-client";
import { Route } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import SignUp from "./components/Pages/SignUp/SignUp";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import MessageForm from "./components/UI/Form/MessageForm/MessageForm";
import SignIn from "./components/Pages/SignIn/SignIn";

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
        <Route path="/messages" exact component={MessageForm} />
        <Route path="/sign-up" exact component={SignUp} />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
