import React, { useState } from "react";
import classes from "./DrawerToggle.module.css";
import navItemsClasses from "../../NavigationItems/NavigationItems.module.css";
import backDropClasses from "../../../UI/Backdrop/Backdrop.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";

function DrawerToggle() {
  const [state, setState] = useState(false);
  let assignClasses;

  if (!state) assignClasses = ["bx bx-menu"].join("");
  if (state) assignClasses = ["bx bx-menu", "bx-x"].join(" ");

  const drawerToggleHandler = () => {
    const nav = document.getElementById("nav-bar");
    const header = document.getElementById("header");
    const body = document.getElementById("bodypd");
    const backdrop = document.getElementById("backdrop");

    if (nav && body && header && backdrop) {
      nav.classList.toggle(navItemsClasses.Show);
      body.classList.toggle(classes.Body_pd);
      header.classList.toggle(classes.Body_pd);
      backdrop.classList.toggle(backDropClasses.Show);
      setState((prevState) => {
        return !prevState;
      });
    }
  };
  return (
    <>
      <Backdrop />
      <header className={classes.Header} id="header">
        <div className={classes.Header_toggle} onClick={drawerToggleHandler}>
          <i className={assignClasses} id="drawer-toggle" />
        </div>
      </header>
    </>
  );
}

export default DrawerToggle;
