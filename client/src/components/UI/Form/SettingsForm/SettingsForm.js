import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import ChangeUserPhoto from "../../../Pages/Settings/ChangeUserPhoto/ChangeUserPhoto";
import ChangeUserPassword from "../../../Pages/Settings/ChangeUserPwd/ChangeUserPwd";
import ChangeUserName from "../../../Pages/Settings/ChangeUserName/ChangeUserName";
import { deleteAccount } from "../../../Pages/Settings/Utils/settingsUtils";
import classes from "./SettingsForm.module.css";
import Button from "../../Button/Button";
import { BaseUrl } from "../../../../App";
import SignOut from "../../../Navigation/Utils/SignOut";
import { AuthContext } from "../../../../contexts/auth/authContext";

const useSettingsForm = () => {
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useContext(AuthContext);

  const handleDelete = async () => {
    await deleteAccount(`${BaseUrl}/delete/account`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          SignOut(state, dispatch);
          setRedirect({ redirect: true });
        }
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };

  if (redirect) return <Redirect to="/" />;

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
        <ChangeUserPhoto signOut={() => SignOut(state, dispatch)} />
        <div className={classes.InputForm}>
          <ChangeUserName signOut={() => SignOut(state, dispatch)} />
          <ChangeUserPassword signOut={() => SignOut(state, dispatch)} />
          <Button
            className={classes.Danger}
            buttonClick={() => handleDelete()}
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
