import React, { useContext } from "react";
import PropTypes from "proptypes";
import classes from "./Logo.module.css";
import { AuthContext } from "../../../contexts/auth/authContext";

function Logo(props) {
  const { image } = props;
  const [state, dispath] = useContext(AuthContext);
  if (!state) localStorage.setItem("userImage", "default.jpg");
  if (state) localStorage.setItem("userImage", state.userImage);
  return (
    <img
      className={classes.LogoImg}
      src={`https://userspictures.s3.us-east-2.amazonaws.com/${localStorage.getItem(
        "userImage"
      )}`}
      alt="Logo"
    />
  );
}

Logo.propTypes = {
  image: PropTypes.string,
};

export default Logo;
