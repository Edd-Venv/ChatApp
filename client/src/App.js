import "./App.css";
import React from "react";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <p>App</p>
    </ErrorBoundary>
  );
}

export default App;
