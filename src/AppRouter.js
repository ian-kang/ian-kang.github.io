import React, { useContext, useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "./Components/BaseLayout/BaseLayout";
import MenuEditorHomeView from "./Components/MenuEditorHomeView/MenuEditorHomeView";
import MenuHomeView from "./Components/MenuHomeView/MenuHomeView";
import Login from "./Components/Login/Login";
import { UserContext } from "./App";
import PublicMenuHomeView from "./Components/PublickMenuHomeView/PublicMenuHomeView";
import Profile from "./Components/Profile/Profile";

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
                  authService={authService}
                  component={
                    <MenuHomeView
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
                  authService={authService}
                  component={<Profile user={user} />}
                />
              }
            ></Route>
          </>
        )}
        {customerIds &&
          database &&
          customerIds.map((customerId) => (
            <Route
              path={`/menu/${database[customerId].publicUrl}`}
              element={
                <BaseLayout
                  authService={authService}
                  component={
                    <PublicMenuHomeView
                      menus={database[customerId].menus}
                      logo={
                        database[customerId].logo && database[customerId].logo
                      }
                      name={database[customerId].name}
                    />
                  }
                />
              }
            />
          ))}

        <Route path="*" element={<Login authService={authService} />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
