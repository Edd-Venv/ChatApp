import React from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import backgroundClasses from "../../UI/Background/Background.module.css";

function signedOutHome() {
  return (
    <>
      <div className={backgroundClasses.BackGroundImg} />
      <section className={classes.Instructions}>
        <div className={classes.InstructionsContainer}>
          <h1>Instructions</h1>
          <p className={classes.InstructionsParagraph}>
            This is a <strong>Private</strong> Messaging application.
            <br />
            Therefore it requries you to create two accounts.
            <br />
            Please create the first account then sign in and it will guide you
            on how to create the second account.
            <br />
            <br />
            <Link to="/sign-up/none">
              <strong style={{ color: "#5858ff" }}>Sign Up </strong>
            </Link>{" "}
            or{" "}
            <Link to="/sign-in">
              <strong style={{ color: "#5858ff" }}>Sign In</strong>
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default signedOutHome;
