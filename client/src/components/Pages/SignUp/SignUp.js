import React, { useRef, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "proptypes";
import toolTip from "../../UI/ToolTip/ToolTip";
import { BaseUrl } from "../../../App";
import Form from "../../UI/Form/Form";

function SignUp(props) {
  const firstInputRef = useRef();
  const secondInputRef = useRef();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    firstInputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "name") setName(event.target.value.toUpperCase());
    else if (event.target.name === "password") setPassword(event.target.value);
    else {
      const blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
      setFile(blob);
    }
  };

  const onfirstInputKeyDown = (event) => {
    if (event.key === "Enter") secondInputRef.current.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { token } = props.match.params;
    const formData = new FormData();
    formData.append("person_name", name);
    formData.append("password", password);
    if (token !== "none") formData.append("token", token);
    if (file) formData.append("photo", file);

    try {
      fetch(`${BaseUrl}/sign-up`, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.status === "success") setRedirect(true);
          else throw new Error(res.message);
        })
        .catch((err) => {
          toolTip("signup", "inputID", "formID", err);
        });
    } catch (err) {
      console.log("SignUp", err);
    }
  };

  if (redirect) return <Redirect to="/sign-in" />;

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
      formTitle="Sign Up"
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onBlobInputChange={handleChange}
    />
  );
}

SignUp.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
};

export default SignUp;
