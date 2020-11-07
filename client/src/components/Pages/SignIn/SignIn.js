import React, { useState, useContext, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth/authContext";
import toolTip from "../../UI/ToolTip/ToolTip";
import { BaseUrl, socket } from "../../../App";
import Form from "../../UI/Form/Form";

function SignIn() {
  const firstInputRef = useRef();
  const secondInputRef = useRef();
  const [name, setName] = useState("");
  const [, dispath] = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    firstInputRef.current.focus();
    socket.on("sign-in", (data) => {
      console.log("dta from server", data);
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
            dispath({
              jwt: res.jwt,
              authenicated: true,
              userId: res.id_uid,
              isLoaded: true,
              userImage: res.person_image,
              userName: res.person_name,
            });

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

  if (redirect) return <Redirect to="/messages" />;

  return (
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
  );
}

export default SignIn;
