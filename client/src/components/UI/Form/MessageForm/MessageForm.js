import React, { useEffect } from "react";
import PropTypes from "proptypes";
import BackGroundClasses from "../../Background/Background.module.css";
import classes from "./MessageForm.module.css";
import messageHandler from "../../../Pages/Utils/Utils";
import Spinner from "../../Spinner/BoxIcon/BoxIconSpinner";

function MessageForm(props) {
  const { onChange, onSubmit, value, texts, onKeyPress, state } = props;
  const { userImage, selectedContact } = state;
  const { person_image } = selectedContact;

  useEffect(() => {
    if (texts.length > 0) {
      const userId = localStorage.getItem("userId");

      for (let j = 0; j < texts[0].texts.length; j++) {
        if (texts[0].texts[j].userId === userId)
          messageHandler(
            texts[0].texts[j].message,
            "test",
            "sent",
            texts[0].texts[j].timeStamp,
            userImage
          );
        else
          messageHandler(
            texts[0].texts[j].message,
            "test",
            "recieved",
            texts[0].texts[j].timeStamp,
            person_image
          );
      }
    }
  }, [texts]);

  return (
    <>
      <div className={BackGroundClasses.BackGroundImg} />
      <div className={classes.Container}>
        <ul id="ul" className={classes.UL} />
        <div id="feedback" />

        <form onSubmit={onSubmit} autoComplete="off" className={classes.Form}>
          <input
            onKeyPress={onKeyPress}
            onChange={onChange}
            name="input"
            value={value}
            className={classes.Input}
            placeholder="Type a message"
          />
          <button className={classes.SendButton} type="submit">
            <i className="bx bx-send" />
          </button>
        </form>
      </div>
    </>
  );
}

MessageForm.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  texts: PropTypes.any,
  onKeyPress: PropTypes.func,
  state: PropTypes.any,
};

export default MessageForm;

// <div className={BackGroundClasses.BackGroundImg} />
