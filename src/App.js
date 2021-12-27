import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";

export const UserContext = React.createContext();

export function App({ authService }) {
  const [user, setUser] = useState("first");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppRouter authService={authService} />
    </UserContext.Provider>
  );
}
