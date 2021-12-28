import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuListView from "../MenuListView/MenuListView";

function MenuHomeView({ menus }) {
  return (
    <Grid container justifyContent="center">
      {menus ? (
        <MenuListView key={Date.now()} menus={menus} />
      ) : (
        <Grid item>No Data Available</Grid>
      )}
    </Grid>
  );
}

export default MenuHomeView;
