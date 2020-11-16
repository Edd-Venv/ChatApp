import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { Redirect } from "react-router-dom";
import { SocketContext } from "../../../contexts/socket/socketContext";
import { AuthContext } from "../../../contexts/auth/authContext";
import { BaseUrl, socket } from "../../../App";
import MessageForm from "../../UI/Form/MessageForm/MessageForm";
import messageHandler, { getDate } from "../Utils/Utils";
import classes from "./Message.module.css";
import Contacts from "./Contacts/Contacts";

function Message() {
  const [state, dispath] = useContext(AuthContext);
  const [socketState, socketDispath] = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [texts, setTexts] = useState([]);
  const { userId, userName, selectedContact, authenticated, jwt } = state;
  const id_uid = useMemo(() => selectedContact.id_uid, [selectedContact]);

  useEffect(() => {
    if (id_uid !== "dummy")
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

    socket.on("received-message", (dta) => {
      messageHandler(dta.message, dta.from.userName, "recieved", dta.timeStamp);
    });

    socket.on("sent-message", (info) => {
      messageHandler(info.message, info.from.userName, "sent", info.timeStamp);
    });

    return () => {
      socket.off("received-message");
      socket.off("sent-message");
    };
  }, [selectedContact]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const timeStamp = getDate();
    const data = {
      to: id_uid,
      from: { userId, userName },
      message,
      timeStamp,
    };
    socket.emit("send-message", data);
    setMessage("");
  });

  const handleChange = useCallback((event) => {
    if (event.target.name === "input") setMessage(event.target.value);
  });

  if (!authenticated) return <Redirect to="/sign-in" />;

  return (
    <div className={classes.Container}>
      <Contacts />
      <MessageForm
        texts={texts}
        onChange={handleChange}
        onSubmit={handleSubmit}
        value={message}
      />
    </div>
  );
}

export default Message;
