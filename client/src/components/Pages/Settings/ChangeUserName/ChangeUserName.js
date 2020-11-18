import React, { useState } from "react";
import Form from "../../../UI/Form/Form";
import { BaseUrl } from "../../../../App";
import { changeUserName } from "../Utils/settingsUtils";

function ChangeUserName() {
  const [oldUserName, setOldUserName] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const handleChange = (event) => {
    if (event.target.name === "new name")
      setNewUserName(event.target.value.toUpperCase());
    else setOldUserName(event.target.value.toUpperCase());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    changeUserName(
      `${BaseUrl}/account/settings/update/username`,
      newUserName,
      oldUserName
    )
      .then((res) => res.json())
      .then((result) => {});
  };

  return (
    <Form
      firstInputId="change-user-name-input"
      firstInputType="text/number"
      firstInputLabel="old name"
      firstInputPlaceHolder="Old User Name"
      firstInputValue={oldUserName}
      secondInputPlaceHolder="New User Name"
      secondInputType="text/number"
      secondInputLabel="new name"
      secondInputValue={newUserName}
      buttonType="submit"
      formTitle="Change User Name"
      onOldNameInputChange={handleChange}
      onNewNameInputChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default ChangeUserName;