import React, { createContext, useReducer, useEffect } from "react";
import PropTypes from "proptypes";
import authReducer from "./authReducer.js";
import { BaseUrl } from "../../App.js";

export const initialState = {
  isLoaded: false,
  authenticated: false,
  userId: null,
  selectedContact: { id_uid: "dummy" },
  userImage: "default.jpg",
  jwt: null,
};
export const AuthContext = createContext([]);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.jwt !== null)
      fetch(`${BaseUrl}/authentication`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.jwt}`,
        },
        body: JSON.stringify({ jwt: state.jwt }),
      })
        .then((result) => {
          return result.json();
        })
        .then((response) => {
          if (
            response.message === "Cannot read property 'split' of undefined"
          ) {
            const newState = Object.assign({}, state);
            newState.authenticated = false;
            newState.isLoaded = true;
            newState.type = "AUTH";
            dispatch(newState);
          } else {
            const newState = Object.assign({}, state);
            newState.authenticated = true;
            newState.isLoaded = true;
            newState.type = "AUTH";
            dispatch(newState);
          }
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
