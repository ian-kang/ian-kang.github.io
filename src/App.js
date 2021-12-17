import { Box } from "@mui/material";
import { useState } from "react";
import "./App.css";
import MenuEditorHomeView from "./Components/MenuEditorHomeView/MenuEditorHomeView";
import NavBar from "./Components/NavBar/NavBar";
import repo from "./Repository/database";

export default function App() {
  const customerId = "restaurant1";
  const [database, setDatabase] = useState(repo);

  const updateMenu = (customerId, category, menuId, updatedMenu) => {
    const updated = { ...database };
    updated[customerId].menus[category][menuId] = updatedMenu;
    setDatabase(updated);
  };
  const deleteMenu = (customerId, category, menuId) => {
    const deleted = { ...database };
    delete deleted[customerId].menus[category][menuId];
    setDatabase(deleted);
  };
  const addMenu = (customerId, category, menu) => {
    console.log(database);
    console.log(customerId, category, menu);
    const added = { ...database };
    added[customerId].menus[category][
      `${category}${Object.keys(added[customerId].menus[category]).length + 1}`
    ] = menu;
    setDatabase(added);
  };
  const addCategory = (customerId, category) => {
    const updated = { ...database };
    updated[customerId].menus = category;
    setDatabase(updated);
  };
  const editCategory = (customerId, category) => {
    const updated = { ...database };
    updated[customerId].menus = category;
    setDatabase(updated);
  };
  return (
    <Box>
      <NavBar
        logo={database[customerId]["logoImg"]}
        name={database[customerId].name}
      />
      <MenuEditorHomeView
        customerId={customerId}
        menus={database[customerId].menus}
      />
    </Box>
  );
}
