import React from "react";
import classes from "./Toolbar.module.css";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import NavigationItems from "../NavigationItems/NavigationItems";

function Toolbar() {
  return (
    <div>
      <DrawerToggle />
      <NavigationItems />
    </div>
  );
}

export default Toolbar;
