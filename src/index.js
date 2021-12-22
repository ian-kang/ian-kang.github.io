import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
