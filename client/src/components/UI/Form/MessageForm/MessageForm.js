import React, { useState, useEffect } from "react";
import { socket } from "../../../../App";

function MessageForm() {
  const [state, setState] = useState({ message: "" });

  const handleChange = (event) => {
    if (event.target.name === "input")
      setState({ message: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("send-message", state.message);
  };

  useEffect(() => {
    socket.on("received-message", (data) => {
      console.log("socketedCalled");
      const message = document.createElement("li");
      message.innerHTML = `${data}`;
      message.style.color = "#ffff";
      document.getElementById("ul").appendChild(message);
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <ul id="ul" />
      <form onSubmit={handleSubmit} autoComplete="off">
        <input onChange={handleChange} name="input" value={state.message} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default MessageForm;
