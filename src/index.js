import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import initializeFirebaseApp from "./Service/Firebase/firebase";
import { App } from "./App";
import AuthService from "./Service/Auth/auth";

initializeFirebaseApp();
const authService = new AuthService();

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} />
  </React.StrictMode>,
  document.getElementById("root")
);
