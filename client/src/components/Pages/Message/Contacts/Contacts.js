import React, { useContext, useState, useEffect } from "react";
import Contact from "./Contact/Contact";
import { BaseUrl } from "../../../../App";
import { AuthContext } from "../../../../contexts/auth/authContext";
import classes from "./Contacts.module.css";
import contactClasses from "./Contact/Contact.module.css";

function Contacts() {
  const [state, dispath] = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const { jwt, userId, userName } = state;

  useEffect(() => {
    fetch(`${BaseUrl}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ userId, userName }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message) console.log("err", result.message);
        else setContacts(result.contacts);
      });
  }, []);

  const trackSelected = (id) => {
    const queryedContact = document.getElementById(id);
    const assignedClasses = [
      contactClasses.ContactBox,
      contactClasses.Current,
    ].join(" ");

    if (queryedContact) {
      queryedContact.className = assignedClasses;
    }
    if (document.getElementById(`contact-${state.selectedContact.id_uid}`))
      document.getElementById(
        `contact-${state.selectedContact.id_uid}`
      ).className = contactClasses.ContactBox;
  };

  const noContacts = (
    <>
      <h2 className={classes.NoContacts}>Please add contacts.</h2>
    </>
  );

  if (!contacts) return noContacts;

  if (contacts) {
    if (contacts.length === 0) return noContacts;
  }

  return (
    <>
      <div className={classes.Container}>
        <h2
          className={contactClasses.ContactBox}
          style={{ height: "fit-content" }}
        >
          Contacts
        </h2>
        {contacts.map((contact) => {
          return (
            <div key={contact.id_uid}>
              <Contact contact={contact} trackSelected={trackSelected} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default React.memo(Contacts);

//  (prevProps, nextProps) => prevProps === nextProps
