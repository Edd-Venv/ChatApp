import React, { useContext, useState, useCallback } from "react";
import SignedOutHome from "./SignedOutHome";
import toolTip from "../../UI/ToolTip/ToolTip";
import { BaseUrl } from "../../../App";
import { AuthContext } from "../../../contexts/auth/authContext";
import SignedInHome from "./SignedInHome";

function Home() {
  const [state, dispatch] = useContext(AuthContext);
  const { jwt, userId, authenticated } = state;
  const [input, setInput] = useState("");

  const handleChange = useCallback((event) => {
    if (event.target.name === "contactId") setInput(event.target.value);
  });

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    try {
      fetch(`${BaseUrl}/add-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          contactId: input,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status === "success")
            toolTip("home", "inputID", "formID", response.message, 0, 500);
          else toolTip("home", "inputID", "formID", response.message, 0, 500);
          setInput("");
        });
    } catch (error) {
      console.log(error);
    }
  });

  const copyUrl = useCallback((el) => {
    const pElement = document.getElementById(el);
    window.navigator.clipboard.writeText(pElement.innerText);
    document.getElementById(`copy${el}`).style.color = "green";
  });

  if (authenticated)
    return (
      <SignedInHome
        userId={userId}
        copyUrl={copyUrl}
        input={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );
  return <SignedOutHome />;
}

export default Home;
