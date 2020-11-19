import React from "react";
import { initialState } from "../../../contexts/auth/authContext";
import { socket } from "../../../App";
import Spinner from "../../UI/Spinner/Spinner";

function SignOut(state, dispatch) {
  const oldState = Object.assign({}, initialState);
  oldState.type = "LOGOUT";
  dispatch(oldState);
  socket.disconnect(true);

  return <Spinner />;
}

export default SignOut;
