import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Contact from "./Contact/Contact";
import { BaseUrl } from "../../../App";
import { AuthContext } from "../../../contexts/auth/authContext";
import BackGroundClasses from "../../UI/Background/Background.module.css";
import classes from "./Contacts.module.css";
import Spinner from "../../UI/Spinner/Spinner";

function Contacts() {
  const [state, dispath] = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
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
        if (result.message) console.log("err", result.message);
        else setContacts(result.contacts);
      });
  }, []);

  if (!authenticated) return <Redirect to="/sign-in" />;
  if (contacts.length === 0) return <p>no contacts, please add contacts</p>;

  return (
    <>
      <div className={BackGroundClasses.BackGroundImg} />
      <div className={classes.Container}>
        {contacts.map((contact) => {
          return (
            <div key={contact.id_uid}>
              <Contact contact={contact} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Contacts;
