import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MenuEditorHomeView from "./Components/MenuEditorHomeView/MenuEditorHomeView";
import MenuHomeView from "./Components/MenuHomeView/MenuHomeView";
import Cloudinary from "./Service/Cloudinary/cloudinary";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import BaseLayout from "./Components/BaseLayout/BaseLayout";
import AuthService from "./Service/Auth/auth";

const cloudinary = new Cloudinary();
const authService = new AuthService();
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BaseLayout
              component={<Home authService={authService} user={user} />}
            />
          }
        />
        <Route
          path="/editor"
          element={
            <BaseLayout
              component={<MenuEditorHomeView cloudinary={cloudinary} />}
            />
          }
        ></Route>
        <Route
          path="/menu"
          element={<BaseLayout component={<MenuHomeView />} />}
        ></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
