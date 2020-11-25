/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import Background from "../../UI/Background/Background";
import Form from "../../UI/Form/Form";
import { BaseUrl } from "../../../App";
import handleToolTip from "../../UI/ToolTip/ToolTip";

function ForgotPassword() {
  const firstInputRef = useRef();
  const secondInputRef = useRef();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    firstInputRef.current.focus();
  }, []);

  const firstInputKeyDown = (event) => {
    if (event.key === "Enter") secondInputRef.current.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${BaseUrl}/forgot/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        userName,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "success") setRedirect(true);
        else throw new Error(response.error);
      })
      .catch((error) =>
        handleToolTip("forgotPwd", "inputID", "formID", error.message)
      );
  };

  const handleChange = (event) => {
    if (event.target.name === "email") setEmail(event.target.value);
    else setUserName(event.target.value.toUpperCase());
  };

  if (redirect) return <Redirect to="/sign-in" />;

  return (
    <Background>
      <Form
        firstInputOnKeyDown={firstInputKeyDown}
        firstInputValue={userName}
        firstInputType="text/number"
        firstInputLabel="username"
        firstInputPlaceHolder="Username"
        firstInputRef={firstInputRef}
        secondInputPlaceHolder="johndoe@gmail.com"
        secondInputType="text"
        secondInputLabel="email"
        secondInputRef={secondInputRef}
        secondInputValue={email}
        buttonType="submit"
        formTitle="Forgot Password"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Background>
  );
}

export default ForgotPassword;
