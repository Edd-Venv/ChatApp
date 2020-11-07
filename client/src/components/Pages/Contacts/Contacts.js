import React, { useContext, useState } from "react";
import Contact from "./Contact/Contact";
import { BaseUrl } from "../../../App";
import { AuthContext } from "../../../contexts/auth/authContext";

function Contacts() {
  const [state, dispath] = useContext(AuthContext);
  const [contacts, setContacts] = useState({});
  console.log("contacts", state);

  /* fetch(`${BaseUrl}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  }); */

  return (
    <div>
      <p>Conntacts</p>
    </div>
  );
}

export default Contacts;
