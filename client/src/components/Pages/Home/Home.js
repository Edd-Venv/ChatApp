import React, { useContext, useState, useCallback } from "react";
import toolTip from "../../UI/ToolTip/ToolTip";
import { BaseUrl } from "../../../App";
import { AuthContext } from "../../../contexts/auth/authContext";
import classes from "./Home.module.css";
import backgroundClasses from "../../UI/Background/Background.module.css";

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
            toolTip("home", "inputID", "formID", response.message);
          else toolTip("home", "inputID", "formID", response.message);
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
      <>
        <div className={backgroundClasses.BackGroundImg} />
        <h1
          style={{
            zIndex: 5,
            position: "relative",
            textAlign: "center",
            color: "#f0f8ff",
          }}
        >
          {" "}
          Add Contact
        </h1>
        <div className={classes.Container}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Your contact doesnt have an account?</h2>
            <h3>Share this link with them</h3>
            <p id="URL">
              {`http://localhost:3000/sign-up/${userId}`}
              <i
                id="copyURL"
                className={`bx bx-clipboard ${classes.CopyIcon}`}
                onClick={() => copyUrl("URL")}
              />
            </p>
            <p>
              <h4>Your ID:</h4> <span id="ID">{`${userId}`}</span>
              <i
                id="copyID"
                className={`bx bx-clipboard ${classes.CopyIcon}`}
                onClick={() => copyUrl("ID")}
              />
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Your contact already has an account?</h2>
            <h3>Add them using thier ID link</h3>
            <form
              onSubmit={handleSubmit}
              autoComplete="off"
              id="formID"
              className={classes.Form}
            >
              <input
                name="contactId"
                value={input}
                onChange={handleChange}
                id="inputID"
                className={classes.Input}
              />
              <button type="submit" className={classes.AddButton}>
                <i className="bx bxs-book-add" />
              </button>
            </form>
          </div>
        </div>
      </>
    );
  return (
    <>
      <div className={backgroundClasses.BackGroundImg} />
      <p style={{ zIndex: 5, position: "absolute" }}>Sign In or Sign Up</p>
    </>
  );
}

export default Home;
