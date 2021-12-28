import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuListView from "../MenuListView/MenuListView";

function MenuHomeView({ customerId, menuRepository }) {
  const [database, setDatabase] = useState({});

  useEffect(() => {
    menuRepository.getMenus(customerId, (data) => {
      if (data) {
        setDatabase(data);
        return;
      }
    });
  }, []);

  return (
    <Grid container justifyContent="center">
      {Object.keys(database).find((key) => key === "menus") ? (
        <MenuListView key={Date.now()} menus={database.menus} />
      ) : (
        <Grid item>No Data Available</Grid>
      )}
    </Grid>
  );
}

export default MenuHomeView;
