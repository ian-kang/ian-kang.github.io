import React, { useContext, useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "./Components/BaseLayout/BaseLayout";
import MenuHomeView from "./Components/MenuHomeView/MenuHomeView";
import LoginView from "./Components/LoginView/LoginView";
import { UserContext } from "./App";
import PublicMenuHomeView from "./Components/PublickMenuHomeView/PublicMenuHomeView";
import ProfileView from "./Components/ProfileView/ProfileView";
import LoadingViewWithAuth from "./Components/LoadingViewWithAuth/LoadingViewAuth";
import MenuOrderEditorHomeView from "./Components/MenuOrderEditorHomeView/MenuOrderEditorHomeView";
import WelcomePageView from "./Components/WelcomePageView/WelcomePageView";
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
          element={<LoginView authService={authService} />}
        />
        {user && (
          <>
            <Route
              path="/editor"
              element={
                <BaseLayout
                  customerId={user.uid}
                  menuRepository={menuRepository}
                  authService={authService}
                  component={
                    <MenuOrderEditorHomeView
                      customerId={user.uid}
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
                  customerId={user.uid}
                  menuRepository={menuRepository}
                  authService={authService}
                  component={
                    <MenuHomeView
                      user={user}
                      customerId={user.uid}
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
                  customerId={user.uid}
                  menuRepository={menuRepository}
                  authService={authService}
                  component={
                    <ProfileView
                      user={user}
                      customerId={user.uid}
                      menuRepository={menuRepository}
                      imageRepository={imageRepository}
                    />
                  }
                />
              }
            ></Route>
          </>
        )}
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

        <Route
          path="*"
          element={
            <LoadingViewWithAuth
              loading={true}
              text="Loading..."
              authService={authService}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
