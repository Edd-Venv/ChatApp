import React, { useState } from "react";
import Form from "../../../UI/Form/Form";
import { BaseUrl } from "../../../../App";
import { changePassword } from "../Utils/settingsUtils";
import toolTip from "../../../UI/ToolTip/ToolTip";

function changeUserPwd() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "New Password")
      setNewPassword(event.target.value);
    else setOldPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    changePassword(
      `${BaseUrl}/account/settings/update/password`,
      newPassword,
      oldPassword
    )
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => toolTip("changeUserPassword", "inputID", "formID", err));
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

export default changeUserPwd;
