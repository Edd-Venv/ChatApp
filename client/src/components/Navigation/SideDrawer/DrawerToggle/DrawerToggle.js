import React from "react";
import classes from "./DrawerToggle.module.css";
import navItemsClasses from "../../NavigationItems/NavigationItems.module.css";
import backDropClasses from "../../../UI/Backdrop/Backdrop.module.css";
import Logo from "../../../UI/Logo/Logo";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import toggleButton from "../../../UI/Button/ToggleButton/ToggleButton";

function DrawerToggle() {
  const drawerToggleHandler = () => {
    const nav = document.getElementById("nav-bar");
    const header = document.getElementById("header");
    const body = document.getElementById("bodypd");
    const backdrop = document.getElementById("backdrop");

    if (nav && body && header && backdrop) {
      toggleButton();
      nav.classList.toggle(navItemsClasses.Show);
      body.classList.toggle(classes.Body_pd);
      header.classList.toggle(classes.Body_pd);
      backdrop.classList.toggle(backDropClasses.Show);
    }
  };

  return (
    <>
      <Backdrop />
      <header className={classes.Header} id="header">
        <div className={classes.Header_toggle} onClick={drawerToggleHandler}>
          <i className="bx bx-menu" id="drawer-toggle" />
        </div>
        <div className={classes.Header_img}>
          <Logo />
        </div>
      </header>
    </>
  );
}

export default DrawerToggle;
