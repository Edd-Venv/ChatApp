import React, { useRef, useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth/authContext";
import toolTip from "../../UI/ToolTip/ToolTip";
import { BaseUrl } from "../../../App";
import Form from "../../UI/Form/Form";

function SignUp() {
  const firstInputRef = useRef();
  const secondInputRef = useRef();
  const [name, setName] = useState("");
  const [, dispath] = useContext(AuthContext);
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
    const formData = new FormData();
    formData.append("person_name", name);
    formData.append("password", password);

    if (file) formData.append("photo", file);

    try {
      fetch(`${BaseUrl}/sign-up`, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.status === "success") {
            dispath({
              jwt: res.jwt,
              authenicated: true,
              userId: res.userId,
              isLoaded: true,
            });
          } else throw new Error(res.message);
        })
        .catch((err) => {
          toolTip("signup", "inputID", "formID", err.message);
        });
    } catch (err) {
      console.log("SignUp", err);
    }
  };

  if (redirect) return <Redirect to="/" />;

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

export default SignUp;
