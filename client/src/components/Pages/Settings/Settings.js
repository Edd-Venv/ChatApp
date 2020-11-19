import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/auth/authContext";

import BackGroundClasses from "../../UI/Background/Background.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import NotAuthorized from "../404";
import SettingsForm from "../../UI/Form/SettingsForm/SettingsForm";

function Settings() {
  const [state, dispatch] = useContext(AuthContext);
  if (!state.authenticated) return <NotAuthorized />;

  if (state.isLoading) return <Spinner />;

  return (
    <>
      <div className={BackGroundClasses.BackGroundImg} />
      <SettingsForm />
    </>
  );
}

export default Settings;
