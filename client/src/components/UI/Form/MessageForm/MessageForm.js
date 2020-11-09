import React from "react";
import PropTypes from "proptypes";
import classes from "./MessageForm.module.css";

function MessageForm(props) {
  const { onChange, onSubmit, value, texts } = props;
  console.log("messageForm", texts);
  return (
    <div className={classes.Container}>
      <ul id="ul" className={classes.UL} />
      <form onSubmit={onSubmit} autoComplete="off" className={classes.Form}>
        <input
          onChange={onChange}
          name="input"
          value={value}
          className={classes.Input}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

MessageForm.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  texts: PropTypes.array,
};

export default MessageForm;
