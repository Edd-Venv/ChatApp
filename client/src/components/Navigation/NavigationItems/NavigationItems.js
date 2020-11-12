import React, { useContext, useEffect } from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { AuthContext } from "../../../contexts/auth/authContext";
import SignOut from "../Utils/signOut";
import classItem from "./NavigationItem/NavigationItem.module.css";

function NavigationItems() {
  const [state, dispatch] = useContext(AuthContext);
  const { authenticated } = state;
  let signIn = null;
  let signUp = null;
  let signOut = null;

  if (!authenticated) {
    signIn = (
      <NavigationItem link="/sign-in">
        <i className={`bx bx-log-in ${classes.Nav_icon}`} />
        <span className={classes.Nav_name}>Sign In</span>
      </NavigationItem>
    );

    signUp = (
      <NavigationItem link="/sign-up/none">
        <i className={`bx bx-log-in-circle ${classes.Nav_icon}`} />
        <span className={classes.Nav_name}>Sign Up</span>
      </NavigationItem>
    );
  }

  if (authenticated) {
    signOut = (
      <li className={classItem.Nav_logo}>
        <a href="/" onClick={() => SignOut()}>
          <i className={`bx bx-log-out ${classes.Nav_icon}`} />
          <span className={classes.Nav_name}>Sign Out</span>
        </a>
      </li>
    );
  }
  return (
    <div className={classes.L_navbar} id="nav-bar">
      <nav className={classes.Nav}>
        <div>
          <NavigationItem link="/">
            <i className={`bx bx-home ${classes.Nav_icon}`} />
            <span className={classes.Nav_name}>Home</span>
          </NavigationItem>
          {signIn}
          <span className={classes.MobileOnly}>
            <NavigationItem link="/contacts">
              <i className={`bx bxs-contact ${classes.Nav_icon}`} />
              <span className={classes.Nav_name}>Contacts</span>
            </NavigationItem>
          </span>
          <span className={classes.DesktopOnly}>
            <NavigationItem link="/messages">
              <i className={`bx bx-message-detail  ${classes.Nav_icon}`} />
              <span className={classes.Nav_name}>Messages</span>
            </NavigationItem>
          </span>
          {signUp}
          {signOut}
        </div>
      </nav>
    </div>
  );
} // <i class='bx bx-home'></i>

export default NavigationItems;
