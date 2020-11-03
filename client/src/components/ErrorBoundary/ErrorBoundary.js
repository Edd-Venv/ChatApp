import React from "react";
import PropTypes from "proptypes";
import Background from "../UI/Background/Background";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, errorMessage: error });
  };

  render() {
    const { hasError, errorMessage } = this.state;
    const { children } = this.props;

    if (hasError)
      return (
        <Background>
          <h1 data-test="component-error-boundary">
            Unable To Load Application, We Are Working on It.
          </h1>
          <p>{errorMessage}</p>
        </Background>
      );
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.object,
};

export default ErrorBoundary;
