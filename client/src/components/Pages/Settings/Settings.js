import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/auth/authContext";
import Background from "../../UI/Background/Background";
import Spinner from "../../UI/Spinner/Spinner";
import NotAuthorized from "../404";
import SettingsForm from "../../UI/Form/SettingsForm/SettingsForm";

function Settings() {
  const [state, dispatch] = useContext(AuthContext);
  if (!state.authenticated) return <NotAuthorized />;

  if (state.isLoading) return <Spinner />;

  return (
    <Background data_test="component-settings">
      <SettingsForm />
    </Background>
  );
}

export default Settings;
