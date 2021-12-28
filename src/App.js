import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";

export const UserContext = React.createContext();

export function App({ authService, menuRepository, imageRepository }) {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppRouter
        authService={authService}
        menuRepository={menuRepository}
        imageRepository={imageRepository}
      />
    </UserContext.Provider>
  );
}
