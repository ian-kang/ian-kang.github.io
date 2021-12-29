import { CardMedia, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuListView from "../MenuListView/MenuListView";

function PublicMenuHomeView({ menus, logo }) {
  return (
    <Grid container justifyContent="center" xs={12}>
      <Grid item xs={4}>
        <CardMedia component="img" image={logo} alt="Logo" />
      </Grid>
      {menus ? (
        <MenuListView key={Date.now()} menus={menus} />
      ) : (
        <Grid item>No Data Available</Grid>
      )}
    </Grid>
  );
}

export default PublicMenuHomeView;
