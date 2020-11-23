/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import "./App.css";
import React, { useEffect } from "react";
import io from "socket.io-client";
import { Route } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import SignUp from "./components/Pages/SignUp/SignUp";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Message from "./components/Pages/Message/Message";
import SignIn from "./components/Pages/SignIn/SignIn";
import Contacts from "./components/Pages/ContactsMobile/Contacts";
import Home from "./components/Pages/Home/Home";
import Settings from "./components/Pages/Settings/Settings";
import ForgotPassword from "./components/Pages/ForgotPwd/ForgotPwd";
import ResetPassword from "./components/Pages/ResetPwd/ResetPwd";

export const socket = io("https://awschatapp.herokuapp.com");
export const BaseUrl = "https://awschatapp.herokuapp.com";

function App() {
  useEffect(() => {
    socket.on("connect", (data) => {
      console.log("app connected");
    });

    socket.on("disconnect", (data) => {
      console.log("disconnected data from server", data);
      socket.removeAllListeners();
    });
  }, []);

  return (
    <ErrorBoundary>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/messages" exact component={Message} />
        <Route path="/sign-up/:token" exact component={SignUp} />
        <Route path="/contacts" exact component={Contacts} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/forgot/password" exact component={ForgotPassword} />
        <Route path="/reset/password/:token" exact component={ResetPassword} />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
