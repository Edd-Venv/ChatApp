import React from "react";
import PropTypes from "proptypes";
import classes from "./Logo.modules.css";

function Logo(props) {
  const { image } = props;
  return (
    <div>
      <img
        className={classes.LogoImg}
        src={`https://userspictures.s3.us-east-2.amazonaws.com/${image}`}
        alt="Logo"
      />
    </div>
  );
}

Logo.propTypes = {
  image: PropTypes.string,
};

export default Logo;
