import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import AuthService from "./Service/Auth/auth";
import FirebaseDatabase from "./Repository/FirebaseDatabase";
import Cloudinary from "./Service/Cloudinary/cloudinary";
import FirebaseAuth from "./Service/Firebase/firebase";

const firebaseAuth = new FirebaseAuth();
const firebaseApp = firebaseAuth.initializeFirebaseApp();
const authService = new AuthService(firebaseAuth);
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
