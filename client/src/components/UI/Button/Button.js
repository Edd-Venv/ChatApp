import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.module.css";

const button = (props) => {
  const assignedClasses = [classes.Button, props.className].join(" ");
  const { type, buttonClick, children } = props;

  return (
    <button
      className={assignedClasses}
      type={props.type ? type : "submit"}
      onClick={buttonClick}
    >
      {children}
    </button>
  );
};

button.propTypes = {
  buttonClick: PropTypes.func,
  buttonType: PropTypes.string,
  children: PropTypes.any,
};
export default button;
