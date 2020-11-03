import React from "react";
import PropTypes from "proptypes";
import classes from "./Box.module.css";

const Box = (props) => {
  const { children } = props;
  return <div className={classes.Box}>{children}</div>;
};

Box.propTypes = {
  children: PropTypes.object,
};
export default Box;
