/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-cycle */
import "./App.css";
import React, { useEffect, useContext } from "react";
import io from "socket.io-client";
import { Route } from "react-router-dom";
import { AuthContext } from "./contexts/auth/authContext";
import Layout from "./containers/Layout/Layout";
import SignUp from "./components/Pages/SignUp/SignUp";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Message from "./components/Pages/Message/Message";
import SignIn from "./components/Pages/SignIn/SignIn";
import Contacts from "./components/Pages/ContactsMobile/ContactsMobile";
import Home from "./components/Pages/Home/Home";
import Settings from "./components/Pages/Settings/Settings";
import ForgotPassword from "./components/Pages/ForgotPwd/ForgotPwd";
import ResetPassword from "./components/Pages/ResetPwd/ResetPwd";
import messageHandler, {
  typingFeedbackHandler,
} from "./components/Pages/Utils/Utils";

export const socket = io("");
export const BaseUrl = "";

function App() {
  const [state, dispatch] = useContext(AuthContext);
  const { selectedContact, userImage } = state;

  useEffect(() => {
    socket.on("connect", (data) => {
      console.log("app connected");
    });

    socket.on("online-users-mobile", (data) => {
      if (data) dispatch({ type: "ONLINESTATUS", onlineUsers: data });
    });

    socket.on("online-users-desktop", (data) => {
      if (data) dispatch({ type: "ONLINESTATUS", onlineUsers: data });
    });

    socket.on("disconnect", (data) => {
      console.log("disconnected data from server", data);
      socket.removeAllListeners();
    });

    socket.on("received-message", (dta) => {
      typingFeedbackHandler("NOTTYPING");
      messageHandler(
        dta.message,
        dta.from.userName,
        "recieved",
        dta.timeStamp,
        selectedContact.person_image
      );
    });

    socket.on("sent-message", (info) => {
      messageHandler(
        info.message,
        info.from.userName,
        "sent",
        info.timeStamp,
        userImage
      );
    });

    socket.on("typing", (info) => {
      typingFeedbackHandler("TYPING", info);
    });

    return () => {
      socket.off("online-users-mobile");
      socket.off("online-users-desktop");
      socket.off("received-message");
      socket.off("sent-message");
      socket.off("typing");
    };
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
