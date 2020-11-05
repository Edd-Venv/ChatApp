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

export const socket = io("http://localhost:4040");
export const BaseUrl = "http://localhost:4040";

function App() {
  socket.on("connection", () => {
    // console.log("socket id", socket.id);
    console.log("app connected");
  });

  return (
    <ErrorBoundary>
      <Layout>
        <Route path="/messages" exact component={MessageForm} />
        <Route path="/sign-up" exact component={SignUp} />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
