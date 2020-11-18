import React, { useState, useContext } from "react";
import { BaseUrl } from "../../../../App";
import { changePhoto } from "../Utils/settingsUtils";
import Button from "../../../UI/Button/Button";
import classes from "./ChangeUserPhoto.module.css";
import { AuthContext } from "../../../../contexts/auth/authContext";

function ChangeUserPhoto() {
  const [state, dispath] = useContext(AuthContext);
  const { userImage } = state;
  const [file, setFile] = useState(null);

  const handleChange = (event) => {
    const blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
    setFile(blob);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("userName", localStorage.getItem("userName"));
    formData.append("photo", file);

    if (file)
      changePhoto(`${BaseUrl}/account/settings/update/user-picture`, formData)
        .then((result) => result.json())
        .then((response) => console.log(response));
  };

  return (
    <form className="settings-image" autoComplete="off" onSubmit={handleSubmit}>
      <div className={classes.Container}>
        <div className={classes.ImgContainer}>
          <img
            alt="Logo"
            className={classes.Img}
            src={`https://userspictures.s3.us-east-2.amazonaws.com/${userImage}`}
          />
        </div>
        <div className={classes.FileUpload}>
          <input
            style={{ outline: "none" }}
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <Button buttonType="submit">Save Photo</Button>
      </div>
    </form>
  );
}

export default ChangeUserPhoto;

// <label htmlFor="photo" />
