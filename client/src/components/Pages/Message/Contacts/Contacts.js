/* eslint-disable indent */
import React, { useContext, useState, useEffect } from "react";
import Contact from "./Contact/Contact";
import { BaseUrl, socket } from "../../../../App";
import { AuthContext } from "../../../../contexts/auth/authContext";
import classes from "./Contacts.module.css";
import contactClasses from "./Contact/Contact.module.css";
import Spinner from "../../../UI/Spinner/BoxIcon/BoxIconSpinner";
import SearchInput from "../../../UI/SearchInput/SearchInput";

function Contacts() {
  const [state, dispatch] = useContext(AuthContext);
  const [contacts, setContacts] = useState(null);
  const [filter, setFilter] = useState("");
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
        if (result.status === "error") dispatch({ type: "LOGOUT" });
        if (result.status === "success") setContacts(result.contacts);
      });

    socket.on("online-users", (data) => {
      console.log("contacts desktop versyion", data);
      dispatch({ type: "ONLINESTATUS", onlineUsers: data });
    });

    return () => {
      socket.off("online-users");
    };
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

  const filteredContacts = !filter
    ? contacts
    : contacts.filter((contact) => {
        return contact.person_name.toLowerCase().includes(filter.toLowerCase());
      });

  const noContacts = (
    <>
      <h2 className={classes.NoContacts}>Please add contacts.</h2>
    </>
  );

  if (!contacts) return <Spinner />;

  if (contacts) {
    if (contacts.length === 0) return noContacts;
  }

  return (
    <>
      <div className={classes.Container}>
        <SearchInput
          handleChange={(event) => setFilter(event.target.value)}
          value={filter}
          placeHolder="Contact name"
        />

        {filteredContacts.map((contact) => {
          if (contact)
            return (
              <div key={contact.id_uid}>
                <Contact contact={contact} trackSelected={trackSelected} />
              </div>
            );
          return null;
        })}
      </div>
    </>
  );
}

export default Contacts;
