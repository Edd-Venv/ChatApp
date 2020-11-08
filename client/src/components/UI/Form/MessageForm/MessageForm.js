import React from "react";
import PropTypes from "proptypes";

function MessageForm(props) {
  const { onChange, onSubmit, value } = props;

  return (
    <div style={{ display: "flex" }}>
      <ul id="ul" />
      <form onSubmit={onSubmit} autoComplete="off">
        <input onChange={onChange} name="input" value={value} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

MessageForm.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
};

export default MessageForm;
