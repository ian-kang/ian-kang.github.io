import React, { useContext } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "./Components/BaseLayout/BaseLayout";
import MenuEditorHomeView from "./Components/MenuEditorHomeView/MenuEditorHomeView";
import MenuHomeView from "./Components/MenuHomeView/MenuHomeView";
import Login from "./Components/Login/Login";
import { UserContext } from "./App";

function AppRouter({ authService, menuRepository, imageRepository }) {
  const { user } = useContext(UserContext);

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login authService={authService} />} />
        {user && (
          <>
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
          </>
        )}

        <Route path="*" element={<Login authService={authService} />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
