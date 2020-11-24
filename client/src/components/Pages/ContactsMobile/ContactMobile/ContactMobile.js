import React, { useContext, useState, useEffect } from "react";
import PropTypes from "proptypes";
import { Redirect } from "react-router-dom";
import Logo from "../../../UI/Logo/Logo";
import classes from "./ContactMobile.module.css";
import { AuthContext } from "../../../../contexts/auth/authContext";

function Contact(props) {
  const [state, dispath] = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const { contact } = props;
  const { person_name, person_image, id_uid } = contact;
  const { onlineUsers } = state;
  const contactID = `${id_uid}`;

  useEffect(() => {
    const onlineStatusHandler = () => {
      const onlineIcon = document.getElementById(
        `onlineStatusMobile-${id_uid}`
      );

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

  const contactHandler = (selectedContact) => {
    dispath({ type: "SELECTEDCONTACT", selectedContact });
    setRedirect(true);
  };

  if (redirect) return <Redirect to="/messages" />;
  return (
    <div
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
        id={`onlineStatusMobile-${id_uid}`}
      />
    </div>
  );
}

Contact.propTypes = {
  person_name: PropTypes.string,
  person_image: PropTypes.string,
  id_uid: PropTypes.string,
  contact: PropTypes.object,
};

export default Contact;
