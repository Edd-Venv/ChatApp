import React from "react";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../UI/Logo/Logo";
import DrawerToggle from "./DrawerToggle/DrawerToggle";

function SideDrawer() {
  return (
    <div>
      <Backdrop />
      <DrawerToggle />
      <Logo />
      <div>
        <NavigationItems />
      </div>
    </div>
  );
}

export default SideDrawer;
