import React, { createContext, useReducer } from "react";
import PropTypes from "proptypes";
import socketReducer from "./socketReducer.js";

export const initialState = {
  socket: null,
};
export const SocketContext = createContext([]);

export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(socketReducer, initialState);

  return (
    <SocketContext.Provider value={[state, dispatch]}>
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  children: PropTypes.object,
};
