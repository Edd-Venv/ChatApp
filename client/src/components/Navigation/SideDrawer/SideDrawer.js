import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "./DrawerToggle/DrawerToggle";

function SideDrawer() {
  return (
    <div>
      <DrawerToggle />
      <div>
        <NavigationItems />
      </div>
    </div>
  );
}

export default SideDrawer;
