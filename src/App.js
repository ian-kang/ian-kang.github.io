import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import MenuEditorHomeView from "./Components/MenuEditorHomeView/MenuEditorHomeView";
import NavBar from "./Components/NavBar/NavBar";

export default function App({ fireBaseDatabase }) {
  const customerId = "restaurant1";
  const [database, setDatabase] = useState();

  useEffect(() => {
    fireBaseDatabase.getMenus(customerId, (data) => {
      setDatabase(data);
      console.log(data);
    });
  }, []);

  const updateMenu = (customerId, menuId, updatedMenu) => {
    fireBaseDatabase.updateMenu(customerId, menuId, updatedMenu);
    fireBaseDatabase.getMenus(customerId, (data) => {
      setDatabase(data);
    });
  };
  const deleteMenu = (customerId, menuId) => {
    fireBaseDatabase.deleteMenu(customerId, menuId);
    fireBaseDatabase.getMenus(customerId, (data) => {
      setDatabase(data);
    });
  };
  const addMenu = (customerId, newMenu, newMenuId) => {
    fireBaseDatabase.addMenu(customerId, newMenu, newMenuId);
    fireBaseDatabase.getMenus(customerId, (data) => {
      setDatabase(data);
    });
  };
  const addCategory = (customerId, category) => {
    const updated = { ...database };
    updated[customerId].menus.push({
      menuId: Date.now(),
      category,
      name: "New menu",
      rate: "none",
      price: "",
      desc: "New menu description",
      img: "",
    });
    setDatabase(updated);
  };
  const editCategory = (customerId, oldCategory, newCategory) => {
    const updated = { ...database };
    updated[customerId].menus.forEach((menu) => {
      if (menu.category === oldCategory) {
        menu.category = newCategory;
        return;
      }
    });
    setDatabase(updated);
  };
  return (
    <>
      {database && (
        <Box>
          <NavBar logo={database["logo"]} name={database.name} />
          <MenuEditorHomeView
            menus={database.menus}
            customerId={customerId}
            updateMenu={updateMenu}
            deleteMenu={deleteMenu}
            addMenu={addMenu}
            editCategory={editCategory}
            addCategory={addCategory}
          />
        </Box>
      )}
    </>
  );
}
