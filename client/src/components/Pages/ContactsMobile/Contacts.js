/* eslint-disable indent */
import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Contact from "./Contact/Contact";
import { BaseUrl, socket } from "../../../App";
import { AuthContext } from "../../../contexts/auth/authContext";
import BackGroundClasses from "../../UI/Background/Background.module.css";
import classes from "./Contacts.module.css";
import Spinner from "../../UI/Spinner/BoxIcon/BoxIconSpinner";
import SearchInput from "../../UI/SearchInput/SearchInput";

function Contacts() {
  const [state, dispatch] = useContext(AuthContext);
  const [contacts, setContacts] = useState(null);
  const [filter, setFilter] = useState("");
  const { jwt, userId, userName, authenticated } = state;

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
        if (result.status === "error") console.log("err", result.error);
        if (result.status === "success") setContacts(result.contacts);
      });

    socket.on("online-users", (data) => {
      console.log("contacts mobile version", data);
      dispatch({ type: "ONLINESTATUS", onlineUsers: data });
    });

    return () => {
      socket.off("online-users");
    };
  }, []);

  if (!authenticated) return <Redirect to="/sign-in" />;

  const noContacts = (
    <>
      <div className={BackGroundClasses.BackGroundImg} />
      <h2 className={classes.NoContacts}>Please add contacts.</h2>
    </>
  );

  const filteredContacts = !filter
    ? contacts
    : contacts.filter((contact) => {
        return contact.person_name.toLowerCase().includes(filter.toLowerCase());
      });

  if (!contacts) return <Spinner />;

  if (contacts) {
    if (contacts.length === 0) return noContacts;
  }

  return (
    <>
      <div className={BackGroundClasses.BackGroundImg} />
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
                <Contact contact={contact} />
              </div>
            );
          return null;
        })}
      </div>
    </>
  );
}

export default Contacts;
