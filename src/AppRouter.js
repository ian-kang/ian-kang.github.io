import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "./Components/BaseLayout/BaseLayout";
import Home from "./Components/Home/Home";
import MenuEditorHomeView from "./Components/MenuEditorHomeView/MenuEditorHomeView";
import MenuHomeView from "./Components/MenuHomeView/MenuHomeView";
import Login from "./Components/Login/Login";

function AppRouter({ authService, menuRepository, imageRepository }) {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login authService={authService} />} />
        <Route
          path="/editor"
          element={
            <BaseLayout
              authService={authService}
              component={
                <MenuEditorHomeView
                  menuRepository={menuRepository}
                  imageRepository={imageRepository}
                />
              }
            />
          }
        ></Route>
        <Route
          path="/menu"
          element={
            <BaseLayout
              authService={authService}
              component={<MenuHomeView menuRepository={menuRepository} />}
            />
          }
        ></Route>
        <Route path="*" element={<Login authService={authService} />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
