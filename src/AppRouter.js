import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "./Components/BaseLayout/BaseLayout";
import Home from "./Components/Home/Home";
import MenuEditorHomeView from "./Components/MenuEditorHomeView/MenuEditorHomeView";
import MenuHomeView from "./Components/MenuHomeView/MenuHomeView";
import Login from "./Components/Login/Login";

function AppRouter({ authService }) {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BaseLayout component={<Home />} />} />
        <Route path="/login" element={<Login authService={authService} />} />
        <Route
          path="/editor"
          element={<BaseLayout component={<MenuEditorHomeView />} />}
        ></Route>
        <Route
          path="/menu"
          element={<BaseLayout component={<MenuHomeView />} />}
        ></Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
