import React, { useState } from "react";
import ChangeUserPhoto from "../../../Pages/Settings/ChangeUserPhoto/ChangeUserPhoto";
import ChangeUserPassword from "../../../Pages/Settings/ChangeUserPasword/ChangeUserPwd";
import ChangeUserName from "../../../Pages/Settings/ChangeUserName/ChangeUserName";
import { deleteAccount } from "../../../Pages/Settings/Utils/accountSettings";
import { Redirect } from "react-router-dom";
import classes from "./SettingsForm.module.css";
import Button from "../../Button/Button";

const useSettingsForm = () => {
  const [state, setState] = useState({ redirect: false });

  if (state.redirect) return <Redirect to="/signout" push={true} />;
  return (
    <div className={classes.Container}>
      {" "}
      <h3
        style={{
          fontFamily: "Oswald, sans-serif",
          textAlign: "center",
          color: "black",
          marginTop: "10vh",
        }}
      >
        ACCOUNT SETTINGS
      </h3>
      <div className={classes.Form}>
        <ChangeUserPhoto />
        <div className={classes.InputForm}>
          <ChangeUserName />
          <ChangeUserPassword />
          <Button
            className={classes.Danger}
            buttonClick={async () => {
              await deleteAccount(
                "https://edd-venv-map.herokuapp.com/delete/account"
              );
              setState({ redirect: true });
            }}
            buttonType="submit"
          >
            DELETE USER
          </Button>
        </div>
      </div>
    </div>
  );
};
export default useSettingsForm;
