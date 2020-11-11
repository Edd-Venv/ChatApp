import React from "react";
import PropTypes from "proptypes";
import Toolbar from "../../components/Navigation/ToolBar/Toobar";
import { AuthContextProvider } from "../../contexts/auth/authContext";

function Layout(props) {
  const { children } = props;
  return (
    <div data-test="component-layout" id="bodypd">
      <AuthContextProvider>
        <Toolbar />
        <main>{children}</main>
      </AuthContextProvider>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
