import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import initializeFirebaseApp from "./Service/Firebase/firebase";
import { App } from "./App";
import AuthService from "./Service/Auth/auth";
import FirebaseDatabase from "./Repository/realtimeDatabase";
import Cloudinary from "./Service/Cloudinary/cloudinary";

const firebaseApp = initializeFirebaseApp();
const authService = new AuthService();
const menuRepository = new FirebaseDatabase(firebaseApp);
const imageRepository = new Cloudinary();

ReactDOM.render(
  <React.StrictMode>
    <App
      authService={authService}
      menuRepository={menuRepository}
      imageRepository={imageRepository}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
