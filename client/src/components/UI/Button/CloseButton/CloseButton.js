import React from "react";
import PropTypes from "proptypes";
import classes from "./CloseButton.module.css";

const CloseButton = (props) => {
  const { onClick, children } = props;

  return (
    <button onClick={onClick} type="submit" className={classes.Closebutton}>
      {children}
    </button>
  );
};

CloseButton.propTypes = {
  children: PropTypes.object,
  onClick: PropTypes.func,
};
export default CloseButton;
