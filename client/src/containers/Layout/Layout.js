import React from "react";
import PropTypes from "proptypes";
import Toolbar from "../../components/Navigation/ToolBar/Toobar";

function Layout(props) {
  const { children } = props;
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
