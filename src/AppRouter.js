import { Route } from "@mui/icons-material";
import React from "react";
import { HashRouter, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import NavBar from "./Components/NavBar/NavBar";

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home navBar={<NavBar />} />} />
        {/* <Route
          path={`${customerId}/editor`}
          element={
            <MenuEditorHomeView2
              fireBaseDatabase={fireBaseDatabase}
              cloudinary={cloudinary}
              customerId={customerId}
              navBar={<NavBar customerId={customerId} />}
            />
          }
        ></Route>
        <Route
          path={`${customerId}/menu`}
          element={<MenuHomeView fireBaseDatabase={fireBaseDatabase} />}
        ></Route> */}
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
