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
import messageHandler, { getDate, typingFeedbackHandler } from "../Utils/Utils";
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
          if (result.error) dispath({ type: "LOGOUT" });
          else {
            setTexts(result.texts);
          }
        });

    socket.on("received-message", (dta) => {
      typingFeedbackHandler("NOTTYPING");
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
      typingFeedbackHandler("TYPING", info);
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

  const emojiHandler = useCallback(() => {
    const emojiContainer = document.getElementById("picker");
    const emojiButton = document.getElementById("emojiBtn");

    if (emojiContainer && emojiButton) {
      if (emojiButton.className === "bx bx-smile")
        emojiButton.className = "bx bx-down-arrow-alt";
      else emojiButton.className = "bx bx-smile";

      emojiContainer.classList.toggle(messageFormClasses.ShowPicker);
      emojiContainer.scrollIntoView({ smooth: true });
    }
  });

  const handleChange = useCallback((event) => {
    if (event.target.name === "input") setMessage(event.target.value);
  });

  const onEmojiClick = useCallback((event, emojiObject) => {
    setMessage(() => {
      emojiHandler();
      return message + emojiObject.emoji;
    });
  });

  if (!authenticated) return <Redirect to="/sign-in" />;

  return (
    <div className={classes.Container}>
      <div className={classes.DesktopOnly}>
        <Contacts />
      </div>
      <MessageForm
        emojiHandler={emojiHandler}
        onKeyPress={onKeyPress}
        texts={texts}
        onChange={handleChange}
        onSubmit={handleSubmit}
        value={message}
        state={state}
        onEmojiClick={onEmojiClick}
      />
    </div>
  );
}

export default Message;
