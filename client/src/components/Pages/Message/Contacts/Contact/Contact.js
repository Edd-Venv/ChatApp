import React, { useContext, useEffect, useState } from "react";
import PropTypes from "proptypes";
import Logo from "../../../../UI/Logo/Logo";
import classes from "./Contact.module.css";
import { AuthContext } from "../../../../../contexts/auth/authContext";

function Contact(props) {
  const [, dispath] = useContext(AuthContext);
  const { contact, trackSelected } = props;
  const { person_name, person_image, id_uid } = contact;

  const contactHandler = (selectedContact) => {
    trackSelected(`contact-${selectedContact.id_uid}`);
    dispath({ type: "SELECTEDCONTACT", selectedContact });
  };

  return (
    <div
      id={`contact-${id_uid}`}
      key={id_uid}
      className={classes.ContactBox}
      onClick={contactHandler.bind(this, contact)}
    >
      <span>{person_name}</span>
      <Logo image={person_image} />
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
