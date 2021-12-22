import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

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
      {Object.keys(database).find((key) => key === "menus") && (
        <MenuListView key={Date.now()} data={database} />
      )}
    </Box>
  );
}

export default MenuHomeView;
