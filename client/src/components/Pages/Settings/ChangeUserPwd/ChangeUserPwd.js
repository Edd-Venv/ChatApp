import React, { useState } from "react";
import Form from "../../../UI/Form/Form";
import { BaseUrl } from "../../../../App";
import { changeUserName } from "../Utils/settingsUtils";

function ChangeUserName() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "New Password")
      setNewPassword(event.target.value);
    else setOldPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    changeUserName(`${BaseUrl}/account/settings/update/password`, newPassword)
      .then((res) => res.json())
      .then((result) => {});
  };

  return (
    <Form
      firstInputId="change-user-password-input"
      firstInputType="password"
      firstInputLabel="Old Password"
      firstInputPlaceHolder="*******"
      firstInputValue={oldPassword}
      secondInputPlaceHolder="******"
      secondInputType="password"
      secondInputLabel="New Password"
      secondInputValue={newPassword}
      buttonType="submit"
      formTitle="Change User Password"
      onOldNameInputChange={handleChange}
      onNewNameInputChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default ChangeUserName;
