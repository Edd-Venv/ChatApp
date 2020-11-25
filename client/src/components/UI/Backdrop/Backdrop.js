import React from "react";
import navItemsClasses from "../../Navigation/NavigationItems/NavigationItems.module.css";
import drawerToggleClasses from "../../Navigation/SideDrawer/DrawerToggle/DrawerToggle.module.css";
import ToggleButton from "../Button/ToggleButton/ToggleButton";
import classes from "./Backdrop.module.css";

const backdrop = () => {
  const backDropHandler = () => {
    const nav = document.getElementById("nav-bar");
    const header = document.getElementById("header");
    const body = document.getElementById("bodypd");
    const backdropEl = document.getElementById("backdrop");

    if (nav && header && body && backdropEl) {
      ToggleButton();
      nav.classList.toggle(navItemsClasses.Show);
      body.classList.toggle(drawerToggleClasses.Body_pd);
      header.classList.toggle(drawerToggleClasses.Body_pd);
      backdropEl.classList.toggle(classes.Show);
    }
  };
  return (
    <div
      onClick={backDropHandler}
      id="backdrop"
      data-test="component-backdrop"
      className={classes.Backdrop}
    />
  );
};

export default backdrop;
