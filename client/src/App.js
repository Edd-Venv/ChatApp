/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import "./App.css";
import React, { useContext, useEffect } from "react";
import io from "socket.io-client";
import { Route } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import SignUp from "./components/Pages/SignUp/SignUp";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Message from "./components/Pages/Message/Message";
import SignIn from "./components/Pages/SignIn/SignIn";
import Contacts from "./components/Pages/Contacts/Contacts";
import Home from "./components/Pages/Home/Home";
import Settings from "./components/Pages/Settings/Settings";
import { SocketContext } from "./contexts/socket/socketContext";

export const socket = io("https://awschatapp.herokuapp.com");
export const BaseUrl = "https://awschatapp.herokuapp.com";

function App() {
  const [, dispatch] = useContext(SocketContext);
  useEffect(() => {
    socket.on("connect", (data) => {
      console.log("app connected");
    });

    socket.on("disconnect", () => {
      socket.removeAllListeners();
    });

    dispatch({ type: "SOCKET", socket });
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
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
