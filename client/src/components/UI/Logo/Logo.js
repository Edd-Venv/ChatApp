import React, { useContext } from "react";
import classes from "./Logo.module.css";
import { AuthContext } from "../../../contexts/auth/authContext";

function Logo() {
  const [state, dispath] = useContext(AuthContext);
  const { userImage } = state;
  // if (!state) localStorage.setItem("userImage", "default.jpg");
  // if (state) localStorage.setItem("userImage", state.userImage);
  return (
    <img
      className={classes.LogoImg}
      src={`https://userspictures.s3.us-east-2.amazonaws.com/${userImage}`}
      alt="Logo"
    />
  );
}

export default Logo;
