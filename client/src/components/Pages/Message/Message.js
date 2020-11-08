import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth/authContext";
import { BaseUrl, socket } from "../../../App";
import MessageForm from "../../UI/Form/MessageForm/MessageForm";

function Message() {
  const [state, dispath] = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { userId, userName, selectedContact, authenticated, jwt } = state;

  const { id_uid, person_image, person_name } = selectedContact;

  useEffect(() => {
    socket.on("received-message", (data) => {
      console.log("socketedCalled");
      const text = document.createElement("li");
      text.innerHTML = `${data.message} from ${data.from.userName}`;
      text.style.color = "#ffff";
      document.getElementById("ul").appendChild(text);
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
        console.log(result);
        if (result.message) console.log("err", result.message); // setError(true);
        // else setMessages(result.messages);
      });
  }, []);
  console.log("Message renderd");
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      to: id_uid,
      from: { userId, userName },
      message,
    };
    socket.emit("send-message", data);
  };

  const handleChange = (event) => {
    if (event.target.name === "input") setMessage(event.target.value);
  };

  if (!authenticated) return <Redirect to="/sign-in" />;

  return (
    <MessageForm
      onChange={handleChange}
      onSubmit={handleSubmit}
      value={message}
    />
  );
}

export default Message;
