import React, { useEffect } from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems() {
  return (
    <div className={classes.L_navbar} id="nav-bar">
      <nav className={classes.Nav}>
        <div>
          <NavigationItem link="/sign-in">
            <i className="bx bx-log-in Nav_icon" />
            <span className={classes.Nav_name}>Sign In</span>
          </NavigationItem>
          <NavigationItem link="/contacts">
            <i className="bx bxs-contact Nav_icon" />
            <span className={classes.Nav_name}>Contacts</span>
          </NavigationItem>
          <NavigationItem link="/sign-up/none">
            <span className={classes.Nav_name}>Sign Up</span>
          </NavigationItem>
        </div>
      </nav>
    </div>
  );
}

export default NavigationItems;

/* useEffect(() => {
    const navbar = document.getElementById("nav-bar");
    const navItem = document.getElementById("nav-item");

    if (navbar && navItem) {
      navItem.addEventListener("click", () => {
        navbar.style.left = "-30%";
      });
    }
  }, []); */
