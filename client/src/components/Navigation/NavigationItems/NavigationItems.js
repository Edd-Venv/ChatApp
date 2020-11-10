import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems() {
  return (
    <div className={classes.L_navbar} id="nav-bar">
      <nav className={classes.Nav}>
        <div>
          <NavigationItem link="/sign-in">
            <i className={`bx bx-log-in ${classes.Nav_icon}`} />
            <span className={classes.Nav_name}>Sign In</span>
          </NavigationItem>
          <NavigationItem link="/contacts">
            <i className={`bx bxs-contact ${classes.Nav_icon}`} />
            <span className={classes.Nav_name}>Contacts</span>
          </NavigationItem>
          <NavigationItem link="/sign-up/none">
            <i className={`bx bx-log-in-circle ${classes.Nav_icon}`} />
            <span className={classes.Nav_name}>Sign Up</span>
          </NavigationItem>
        </div>
      </nav>
    </div>
  );
}

export default NavigationItems;
