import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext, initialState } from "../../../contexts/auth/authContext";
import { socket } from "../../../App";

function SignOut() {
  const [redirect, setRedirect] = useState(false);
  const [, dispatch] = useContext(AuthContext);

  setRedirect(() => {
    const oldState = Object.assign({}, initialState);
    oldState.type = "LOGOUT";
    dispatch(oldState);
    socket.disconnect(true);
    return true;
  });

  if (redirect) return <Redirect to="/" />;
  return null;
}

export default SignOut;
