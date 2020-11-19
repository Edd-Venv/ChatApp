import React, { useContext } from "react";
import PropTypes from "proptypes";
import classes from "./Logo.module.css";
import { AuthContext } from "../../../contexts/auth/authContext";

function Logo(props) {
  const [state, dispath] = useContext(AuthContext);
  const { userImage } = state;
  const { image } = props;
  let assignedimage = userImage;
  if (image) assignedimage = image;
  return (
    <img
      className={classes.LogoImg}
      src={`https://userspictures.s3.us-east-2.amazonaws.com/${assignedimage}`}
      alt="Logo"
    />
  );
}

Logo.propTypes = {
  image: PropTypes.string,
};

export default Logo;
