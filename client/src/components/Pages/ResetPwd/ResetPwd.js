/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Background from "../../UI/Background/Background";
import Form from "../../UI/Form/Form";
import { BaseUrl } from "../../../App";
import handleToolTip from "../../UI/ToolTip/ToolTip";

function ResetPassword() {
  const firstInputRef = useRef();
  const secondInputRef = useRef();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    firstInputRef.current.focus();
  }, []);

  const firstInputKeyDown = (event) => {
    if (event.key === "Enter") secondInputRef.current.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = window.location.pathname.split("/")[2];

    if (newPassword === confirmPassword) {
      fetch(`${BaseUrl}/reset/password/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword,
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
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "newpassword") setNewPassword(event.target.value);
    else setConfirmPassword(event.target.value);
  };

  if (redirect) return <Redirect to="/sign-in" />;

  return (
    <Background>
      <Form
        firstInputOnKeyDown={firstInputKeyDown}
        firstInputValue={newPassword}
        firstInputType="password"
        firstInputLabel="newpassword"
        firstInputPlaceHolder="New Password"
        firstInputRef={firstInputRef}
        secondInputPlaceHolder="Confirm Password"
        secondInputType="password"
        secondInputLabel="confirmpassword"
        secondInputRef={secondInputRef}
        secondInputValue={confirmPassword}
        buttonType="submit"
        formTitle="Reset"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Background>
  );
}
export default ResetPassword;
