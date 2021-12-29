import { CardMedia, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuListView from "../MenuListView/MenuListView";

function PublicMenuHomeView({ menus, logo }) {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <CardMedia component="img" height="140" image={logo} alt="Logo" />
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
