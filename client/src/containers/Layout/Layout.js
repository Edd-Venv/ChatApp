import React from "react";
import PropTypes from "proptypes";
import Toolbar from "../../components/Navigation/ToolBar/Toobar";
import { AuthContextProvider } from "../../contexts/auth/authContext";

function Layout(props) {
  const { children } = props;
  console.log("Layout.js");
  return (
    <div data-test="component-layout" id="bodypd">
      <Toolbar />
      <main>{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
