import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

import NavBar from "../NavBar/NavBar";
import MenuListView from "../MenuListView/MenuListView";

function MenuHomeView({ fireBaseDatabase }) {
  const customerId = "restaurant1";
  const [database, setDatabase] = useState({});

  useEffect(() => {
    fireBaseDatabase.getMenus(customerId, (data) => {
      setDatabase(data);
    });
  }, []);

  return (
    <Box>
      <NavBar logo={database["logo"]} name={database.name} />
      {Object.keys(database).find((key) => key === "menus") && (
        <MenuListView key={Date.now()} data={database} />
      )}
    </Box>
  );
}

export default MenuHomeView;
