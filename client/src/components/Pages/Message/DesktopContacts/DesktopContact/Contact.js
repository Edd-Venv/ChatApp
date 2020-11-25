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
  const contactID = `${id_uid}`;

  const contactHandler = (selectedContact) => {
    if (state.selectedContact.id_uid === selectedContact.id_uid) return;

    trackSelected(`contact-${selectedContact.id_uid}`);
    dispath({ type: "SELECTEDCONTACT", selectedContact });
  };

  useEffect(() => {
    const onlineStatusHandler = () => {
      const onlineIcon = document.getElementById(`onlineStatus-${id_uid}`);
      if (onlineUsers)
        for (let i = 0; i < onlineUsers.length; i++) {
          if (onlineUsers[i] === contactID) {
            onlineIcon.style.color = "green";
            break;
          }
          if (i === onlineUsers.length - 1) {
            if (onlineUsers[i] !== contactID) {
              onlineIcon.style.color = "red";
            }
          }
        }
    };
    onlineStatusHandler();
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
        <small className={classes.Small}>Status: Hi there</small>
      </div>
      <i
        className={`bx bxs-bullseye ${classes.OnlineIcon}`}
        id={`onlineStatus-${id_uid}`}
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
