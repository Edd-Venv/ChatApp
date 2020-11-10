import React from "react";
import PropTypes from "proptypes";
import BackGroundClasses from "../../Background/Background.module.css";
import classes from "./MessageForm.module.css";

function MessageForm(props) {
  const { onChange, onSubmit, value, texts } = props;
  console.log("messageForm", texts);
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
