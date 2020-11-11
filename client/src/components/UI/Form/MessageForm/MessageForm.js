import React, { useEffect } from "react";
import PropTypes from "proptypes";
import BackGroundClasses from "../../Background/Background.module.css";
import classes from "./MessageForm.module.css";
import messageHandler from "../../../Pages/Utils/Utils";

function MessageForm(props) {
  const { onChange, onSubmit, value, texts } = props;
  console.log("messageForm", texts);
  // messageHandler()
  useEffect(() => {
    if (texts.length > 0) {
      /* for (let i = 0; i < texts.length; i++) {

        for (let j = 0; j < texts[0].texts.length; j++) {
          // console.log(texts[0].texts[j].message);
          // console.log("messages", texts[0].texts[j].message);
          messageHandler(texts[0].texts[j].message, "test", "test");
        }

        for (let k = 0; k < texts[1].texts.length; k++) {
          // console.log("messages", texts[0].texts[k].message);
          messageHandler(texts[1].texts[k].message, "test", "recieved");
        }

      } */
    }
  }, []);

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
