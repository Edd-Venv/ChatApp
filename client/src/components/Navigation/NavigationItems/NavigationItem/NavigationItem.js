import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "proptypes";
import classes from "./NavigationItem.module.css";
import navItemsClasses from "../NavigationItems.module.css";
import drawerToggleClasses from "../../SideDrawer/DrawerToggle/DrawerToggle.module.css";
import backdropClasses from "../../../UI/Backdrop/Backdrop.module.css";
import { AuthContext } from "../../../../contexts/auth/authContext";
import { socket } from "../../../../App";
import ToggleButton from "../../../UI/Button/ToggleButton/ToggleButton";

function NavigationItem(props) {
  const [, dispatch] = useContext(AuthContext);
  const { link, children } = props;
  const navItemHandler = () => {
    const nav = document.getElementById("nav-bar");
    const header = document.getElementById("header");
    const body = document.getElementById("bodypd");
    const backdrop = document.getElementById("backdrop");

    if (nav && header && body && backdrop) {
      ToggleButton();
      nav.classList.toggle(navItemsClasses.Show);
      body.classList.toggle(drawerToggleClasses.Body_pd);
      header.classList.toggle(drawerToggleClasses.Body_pd);
      backdrop.classList.toggle(backdropClasses.Show);
    }
    dispatch({ type: "RESETSELECTEDCONTACT" });
    socket.removeAllListeners();
  };
  return (
    <li className={classes.Nav_logo}>
      <NavLink
        to={link}
        exact
        className={classes.Nav_link}
        activeClassName={classes.active}
        onClick={navItemHandler}
      >
        {children}
      </NavLink>
    </li>
  );
}

NavigationItem.propTypes = {
  link: PropTypes.string,
  children: PropTypes.any,
};

export default NavigationItem;

//  onClick={props.closeBackDrop || props.logOut}
