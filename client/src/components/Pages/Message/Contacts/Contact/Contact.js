import React, { useContext, useEffect } from "react";
import PropTypes from "proptypes";
import Logo from "../../../../UI/Logo/Logo";
import classes from "./Contact.module.css";
import { AuthContext } from "../../../../../contexts/auth/authContext";

function Contact(props) {
  const [state, dispath] = useContext(AuthContext);
  const { contact, trackSelected } = props;
  const { person_name, person_image, id_uid } = contact;
  const { onlineUsers } = state;

  const contactHandler = (selectedContact) => {
    if (state.selectedContact.id_uid === selectedContact.id_uid) return;

    trackSelected(`contact-${selectedContact.id_uid}`);
    dispath({ type: "SELECTEDCONTACT", selectedContact });
  };

  useEffect(() => {
    if (onlineUsers) {
      const onlineStatusHandler = () => {
        const onlineIcon = document.getElementById("onlineStatus");

        for (let i = 0; i < onlineUsers.length; i++) {
          if (onlineUsers[i] === id_uid) {
            onlineIcon.style.color = "green";
          }
          if (onlineUsers[i] !== id_uid) {
            onlineIcon.style.color = "red";
          }
        }
      };
      onlineStatusHandler();
    }
  }, [onlineUsers]);

  return (
    <div
      id={`contact-${id_uid}`}
      key={id_uid}
      className={classes.ContactBox}
      onClick={contactHandler.bind(this, contact)}
    >
      <Logo image={person_image} />
      <div className={classes.ContactBoxInfo}>
        <span className={classes.ContactName}>{person_name}</span>
        <small>Status: Hi there</small>
      </div>
      <i
        className={`bx bxs-bullseye ${classes.OnlineIcon}`}
        id="onlineStatus"
      />
    </div>
  );
}

Contact.propTypes = {
  person_name: PropTypes.string,
  person_image: PropTypes.string,
  id_uid: PropTypes.string,
  contact: PropTypes.object,
  trackSelected: PropTypes.func,
};

export default Contact;
