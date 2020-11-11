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
        if (response.message === "Cannot read property 'split' of undefined") {
          localStorage.setItem("userImage", "default.jpg");

          dispatch({
            type: "AUTH",
            isLoaded: true,
            authenticated: false,
            userImage: "default.jpg",
          });
        } else console.log(response);
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

/*  localStorage.setItem("jwt", null);
        localStorage.setItem("userId", response.userId);
          jwt: response.jwt,
          userId: response.userId,
          userImage: response.person_image,
          userName: response.person_name,
        */
