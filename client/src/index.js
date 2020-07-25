import React from "react";
import ReactDOM from "react-dom";

/**
 * Importação do Materialize CSS
 */
import "materialize-css/dist/css/materialize.min.css";

import "./index.css";

import App from "./App";
import Popup from "./components/popup/Popup";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
