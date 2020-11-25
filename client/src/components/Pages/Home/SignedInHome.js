import React from "react";
import PropTypes from "proptypes";
import classes from "./Home.module.css";
import backgroundClasses from "../../UI/Background/Background.module.css";

function signedInHome(props) {
  const { userId, copyUrl, input, handleChange, handleSubmit } = props;
  return (
    <>
      <div className={backgroundClasses.BackGroundImg} />
      <section style={{ display: "flex", justifyContent: "center" }}>
        <div className={classes.Container}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Your contact doesn&apos;t have an account ?</h2>
            <span>Share this link with them:</span>
            <span id="URL">
              {`https://edwinschatapp.netlify.app/#/sign-up/${userId}`}
              <i
                id="copyURL"
                className={`bx bx-clipboard ${classes.CopyIcon}`}
                onClick={() => copyUrl("URL")}
              />
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Your contact already has an account ?</h2>
            <p>Add them using thier ID link:</p>
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              id="formID"
              className={classes.Form}
            >
              <input
                name="contactId"
                value={input}
                onChange={handleChange}
                id="inputID"
                className={classes.Input}
                placeholder="ac21-4801-..."
              />
              <button type="submit" className={classes.AddButton}>
                <i className="bx bxs-book-add" />
              </button>
            </form>
          </div>
          <span>Or share your ID with them: </span>
          <span>
            <big>
              <strong style={{ color: "blue" }}>Your ID:</strong>
            </big>{" "}
            <span id="ID">{`${userId}`}</span>
            <i
              id="copyID"
              className={`bx bx-clipboard ${classes.CopyIcon}`}
              onClick={() => copyUrl("ID")}
            />
          </span>
        </div>
      </section>
    </>
  );
}

signedInHome.propTypes = {
  userId: PropTypes.string,
  copyUrl: PropTypes.func,
  input: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default signedInHome;
