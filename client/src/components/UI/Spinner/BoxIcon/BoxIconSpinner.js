import React from "react";
import BackGround from "../../Background/Background";
import classes from "./BoxIconSpinner.module.css";

const Spinner = () => (
  <BackGround>
    <i className={`bx bx-loader bx-flip-vertical bx-spin ${classes.Icon}`} />
  </BackGround>
);

export default Spinner;
