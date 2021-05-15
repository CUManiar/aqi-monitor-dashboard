/*
 * Created Date: Saturday May 15th 2021
 * Author: Chirag Maniyar
 * -----
 * Last Modified: Saturday May 15th 2021 11:13:17 pm
 * Modified By: the developer formerly known as Chirag Maniyar at <chiragma18633@gmail.com>
 * -----
 * Copyright (c) 2021 Karma Engineering Solutions Pvt. Ltd.
 * -----
 * HISTORY:
 */
import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import Dashboard from "./components/Dashboard.jsx";
import UnsafeScriptsWarning from "./components/UnsafeScriptsWarning";

const App = () => {
  const [showSpinner, setShowSpinner] = useState(true);

  const hideSpinner = () => {
    setShowSpinner(false);
  };

  return (
    <ErrorBoundary FallbackComponent={UnsafeScriptsWarning}>
      <div className="App">
        <header className="header">Proximity Labs AQI Monitor</header>
        <Dashboard hideSpinner={hideSpinner} showSpinner={showSpinner} />{" "}
      </div>
    </ErrorBoundary>
  );
};

export default App;
