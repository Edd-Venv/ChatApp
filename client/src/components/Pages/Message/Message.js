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
import messageFormClasses from "../../UI/Form/MessageForm/MessageForm.module.css";
import Contacts from "./Contacts/Contacts";

function Message() {
  const [state, dispath] = useContext(AuthContext);
  const [socketState, socketDispath] = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [texts, setTexts] = useState([]);
  const {
    userId,
    userName,
    selectedContact,
    authenticated,
    jwt,
    userImage,
  } = state;
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
          else {
            setTexts(result.texts);
          }
        });

    socket.on("received-message", (dta) => {
      const feedback = document.getElementById("feedback");
      const messagesFeed = document.getElementById("ul");
      if (feedback) {
        feedback.innerHTML = "";
        feedback.style.display = "none";
        messagesFeed.style.paddingBottom = "60px";
      }
      messageHandler(
        dta.message,
        dta.from.userName,
        "recieved",
        dta.timeStamp,
        selectedContact.person_image
      );
    });

    socket.on("sent-message", (info) => {
      messageHandler(
        info.message,
        info.from.userName,
        "sent",
        info.timeStamp,
        userImage
      );
    });

    socket.on("typing", (info) => {
      const feedback = document.getElementById("feedback");
      const messagesFeed = document.getElementById("ul");

      if (feedback) {
        const p = document.createElement("p");
        const em = document.createElement("em");
        em.innerHTML = `${info.from} is typing...`;
        p.innerHTML = em.innerHTML;
        feedback.innerHTML = p.innerHTML;
        feedback.className = messageFormClasses.Typing;
        feedback.style.display = "flex";
        feedback.scrollIntoView({ smooth: true });
        messagesFeed.style.paddingBottom = 0;
      }
    });

    return () => {
      socket.off("received-message");
      socket.off("sent-message");
      socket.off("typing");
    };
  }, [selectedContact]);

  const onKeyPress = useCallback((event) => {
    const data = { to: id_uid, from: userName };
    socket.emit("typing", data);
  });

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
        onKeyPress={onKeyPress}
        texts={texts}
        onChange={handleChange}
        onSubmit={handleSubmit}
        value={message}
        state={state}
      />
    </div>
  );
}

export default Message;
