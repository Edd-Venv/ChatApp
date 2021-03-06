import React, { useState, useContext, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import BackGround from "../../UI/Background/Background";
import { AuthContext } from "../../../contexts/auth/authContext";
import toolTip from "../../UI/ToolTip/ToolTip";
import { BaseUrl, socket } from "../../../App";
import Form from "../../UI/Form/Form";

function SignIn() {
  const firstInputRef = useRef();
  const secondInputRef = useRef();
  const [name, setName] = useState("");
  const [state, dispath] = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    firstInputRef.current.focus();
    socket.on("sign-in", (data) => {
      console.log("dta from server", data);
      dispath({ type: "ONLINESTATUS", onlineUsers: data });
    });
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "name") setName(event.target.value.toUpperCase());
    else if (event.target.name === "password") setPassword(event.target.value);
  };

  const onfirstInputKeyDown = (event) => {
    if (event.key === "Enter") secondInputRef.current.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      fetch(`${BaseUrl}/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          person_name: name,
          password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.status === "success") {
            localStorage.setItem("jwt", res.jwt);
            localStorage.setItem("userImage", res.person_image);
            localStorage.setItem("userId", res.id_uid);
            const newState = Object.assign({}, state);
            newState.type = "AUTH";
            newState.jwt = res.jwt;
            newState.authenticated = true;
            newState.userId = res.id_uid;
            newState.isLoaded = true;
            newState.userImage = res.person_image;
            newState.userName = res.person_name;
            dispath(newState);

            socket.emit("sign-in", `${res.id_uid}`);
            setRedirect(true);
          } else throw new Error(res.message);
        })
        .catch((err) => {
          console.log(err);
          toolTip("signup", "inputID", "formID", err);
        });
    } catch (err) {
      console.log("SignUp", err);
    }
  };

  if (redirect) return <Redirect to="/" />;

  return (
    <BackGround>
      <Form
        firstInputOnKeyDown={onfirstInputKeyDown}
        firstInputValue={name}
        firstInputType="text"
        firstInputLabel="name"
        firstInputPlaceHolder="User Name"
        firstInputRef={firstInputRef}
        secondInputPlaceHolder="Password"
        secondInputType="password"
        secondInputLabel="password"
        secondInputRef={secondInputRef}
        secondInputValue={password}
        buttonType="submit"
        formTitle="Sign In"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </BackGround>
  );
}

export default SignIn;
