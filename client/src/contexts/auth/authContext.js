import React, { createContext, useReducer, useEffect } from "react";
import PropTypes from "proptypes";
import authReducer from "./authReducer.js";
import { BaseUrl } from "../../App.js";

const initialState = {
  isLoaded: false,
  authenticated: false,
  userId: null,
  selectedContact: { id_uid: "dummy" },
};
export const AuthContext = createContext([]);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    fetch(`${BaseUrl}/authentication`, {
      method: "POST",
      body: JSON.stringify({ jwt: localStorage.getItem("jwt") }),
    })
      .then((result) => {
        return result.json();
      })
      .then((response) => {
        localStorage.setItem("jwt", response.jwt);
        localStorage.setItem("userId", response.userId);

        dispatch({
          type: "AUTH",
          isLoaded: true,
          authenticated: response.authenticated,
          jwt: response.jwt,
          userId: response.userId,
        });
      });
  }, []);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
AuthContextProvider.propTypes = {
  children: PropTypes.object,
};
