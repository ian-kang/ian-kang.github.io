import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import MenuHomeView from "./Components/MenuHomeView/MenuHomeView";
import FirebaseDatabase from "./Repository/realtimeDatabase";
import Cloudinary from "./Service/Cloudinary/cloudinary";
import { HashRouter, Route, Routes } from "react-router-dom";

const fireBaseDatabase = new FirebaseDatabase();
const cloudinary = new Cloudinary();

ReactDOM.render(
  <React.StrictMode>
    <HashRouter basename="/">
      <Routes>
        <Route
          path="/design"
          element={
            <App fireBaseDatabase={fireBaseDatabase} cloudinary={cloudinary} />
          }
        ></Route>
        <Route
          path="/"
          element={<MenuHomeView fireBaseDatabase={fireBaseDatabase} />}
        ></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
