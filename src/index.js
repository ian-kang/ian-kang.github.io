import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MenuEditorHomeView from "./Components/MenuEditorHomeView/MenuEditorHomeView";
import MenuHomeView from "./Components/MenuHomeView/MenuHomeView";
import FirebaseDatabase from "./Repository/realtimeDatabase";
import Cloudinary from "./Service/Cloudinary/cloudinary";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import BaseLayout from "./Components/BaseLayout/BaseLayout";

const fireBaseDatabase = new FirebaseDatabase();
const cloudinary = new Cloudinary();

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<BaseLayout component={<Home />} />} />
        <Route
          path="/editor"
          element={
            <BaseLayout
              component={
                <MenuEditorHomeView
                  fireBaseDatabase={fireBaseDatabase}
                  cloudinary={cloudinary}
                />
              }
            />
          }
        ></Route>
        <Route
          path="/menu"
          element={
            <BaseLayout
              component={<MenuHomeView fireBaseDatabase={fireBaseDatabase} />}
            />
          }
        ></Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
