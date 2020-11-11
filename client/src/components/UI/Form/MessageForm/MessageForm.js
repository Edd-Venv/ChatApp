import React, { useEffect } from "react";
import PropTypes from "proptypes";
import BackGroundClasses from "../../Background/Background.module.css";
import classes from "./MessageForm.module.css";
import messageHandler from "../../../Pages/Utils/Utils";

function MessageForm(props) {
  const { onChange, onSubmit, value, texts } = props;

  useEffect(() => {
    if (texts.length > 0) {
      const userId = localStorage.getItem("userId");

      for (let j = 0; j < texts[0].texts.length; j++) {
        if (texts[0].texts[j].userId === userId)
          messageHandler(
            texts[0].texts[j].message,
            "test",
            "test",
            texts[0].texts[j].timeStamp
          );
        else
          messageHandler(
            texts[0].texts[j].message,
            "test",
            "recieved",
            texts[0].texts[j].timeStamp
          );
      }
    }
  }, [texts]);

  return (
    <>
      <div className={BackGroundClasses.BackGroundImg} />
      <div className={classes.Container}>
        <ul id="ul" className={classes.UL} />

        <form onSubmit={onSubmit} autoComplete="off" className={classes.Form}>
          <input
            onChange={onChange}
            name="input"
            value={value}
            className={classes.Input}
            placeholder="Type a message"
          />
          <button className={classes.SendBottom} type="submit">
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
  texts: PropTypes.array,
};

export default MessageForm;
