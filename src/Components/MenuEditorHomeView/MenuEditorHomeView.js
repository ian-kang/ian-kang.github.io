import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import MenuEditorListView from "../MenuEditorListView/MenuEditorListView";

function MenuEditorHomeView({ customerId, menus }) {
  const categories = [...new Set(menus.map((menu) => menu.category))];
  return (
    <Grid container>
      <Grid container item justifyContent="center">
        <Grid item>
          <Typography variant="h5">Menu Editor</Typography>
        </Grid>
      </Grid>

      {menus.map((menu) => (
        <Grid container item justifyContent="center">
          <Grid container item xs={10} spacing={4}>
            <Grid container item xs={12}>
              c
              <MenuEditorListView
                customerId={customerId}
                menus={menus}
                categories={categories}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default MenuEditorHomeView;
