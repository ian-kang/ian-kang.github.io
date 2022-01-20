import React, { useContext, useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "./Components/BaseLayout/BaseLayout";
import MenuHomeView from "./Components/MenuHomeView/MenuHomeView";
import LoginView from "./Components/LoginView/LoginView";
import { UserContext } from "./App";
import PublicMenuHomeView from "./Components/PublicMenuHomeView/PublicMenuHomeView";
import ProfileView from "./Components/ProfileView/ProfileView";
import MenuOrderEditorHomeView from "./Components/MenuOrderEditorHomeView/MenuOrderEditorHomeView";
import WelcomePageView from "./Components/WelcomePageView/WelcomePageView";
import PageNotFoundView from "./Components/PageNotFoundView/PageNotFoundView";
function AppRouter({ authService, menuRepository, imageRepository }) {
  const { user } = useContext(UserContext);
  const [customerIds, setCustomerIds] = useState();
  const [database, setDatabase] = useState();
  useEffect(() => {
    menuRepository.getDatabase((data) => {
      const customerIdArray = Object.keys(data);
      setCustomerIds(customerIdArray);
      setDatabase(data);
    });
    console.log("appRouter userEffect");
  }, [menuRepository, user]);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<WelcomePageView menuRepository={menuRepository} />}
        />
        <Route
          path="/login"
          element={
            <LoginView
              authService={authService}
              menuRepository={menuRepository}
            />
          }
        />

        <Route
          path="/editor"
          element={
            <BaseLayout
              customerId={user && user.uid}
              menuRepository={menuRepository}
              authService={authService}
              component={
                <MenuOrderEditorHomeView
                  customerId={user && user.uid}
                  menuRepository={menuRepository}
                  imageRepository={imageRepository}
                />
              }
            />
          }
        ></Route>
        <Route
          path="/preview"
          element={
            <BaseLayout
              customerId={user && user.uid}
              menuRepository={menuRepository}
              authService={authService}
              component={
                <MenuHomeView
                  user={user && user}
                  customerId={user && user.uid}
                  menuRepository={menuRepository}
                />
              }
            />
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <BaseLayout
              customerId={user && user.uid}
              menuRepository={menuRepository}
              authService={authService}
              component={
                <ProfileView
                  user={user && user}
                  customerId={user && user.uid}
                  menuRepository={menuRepository}
                  imageRepository={imageRepository}
                />
              }
            />
          }
        ></Route>

        {customerIds &&
          database &&
          customerIds.map((customerId) => (
            <Route
              key={customerId}
              path={`/menu/${database[customerId].publicUrl}`}
              element={
                <PublicMenuHomeView
                  menus={database[customerId].menus}
                  logo={database[customerId].logo && database[customerId].logo}
                  name={database[customerId].name}
                />
              }
            />
          ))}

        {/* <Route path="*" element={<PageNotFoundView />} /> */}
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
