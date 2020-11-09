import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth/authContext";
import { BaseUrl, socket } from "../../../App";
import MessageForm from "../../UI/Form/MessageForm/MessageForm";
import messageHandler from "../Utils/Utils";

function Message() {
  const [state, dispath] = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [texts, setTexts] = useState([]);
  const { userId, userName, selectedContact, authenticated, jwt } = state;

  const { id_uid } = selectedContact;

  useEffect(() => {
    socket.on("received-message", (data) => {
      messageHandler(data.message, data.from.userName, "recieved");
    });

    fetch(`${BaseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        to: id_uid,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message) console.log("err", result.message);
        else setTexts(result.texts);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      to: id_uid,
      from: { userId, userName },
      message,
    };
    socket.emit("send-message", data);
    messageHandler(message, userName, userName);
    setMessage("");
  };

  const handleChange = (event) => {
    if (event.target.name === "input") setMessage(event.target.value);
  };

  if (!authenticated) return <Redirect to="/sign-in" />;

  return (
    <MessageForm
      texts={texts}
      onChange={handleChange}
      onSubmit={handleSubmit}
      value={message}
    />
  );
}

export default Message;
