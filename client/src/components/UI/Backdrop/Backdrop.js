import React from "react";
import classes from "./Backdrop.module.css";

const backdrop = (props) => {
  return (
    <div
      id="backdrop"
      data-test="component-backdrop"
      className={classes.Backdrop}
      onClick={props.backdropClicked}
    />
  );
};

export default backdrop;
