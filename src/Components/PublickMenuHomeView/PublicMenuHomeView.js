import { Dashboard, ViewList } from "@mui/icons-material";
import {
  Avatar,
  CardMedia,
  Grid,
  ListItem,
  ListItemAvatar,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuCardView from "../MenuCardView/MenuCardView";
import MenuListView from "../MenuListView/MenuListView";

function PublicMenuHomeView({ menus, logo, name }) {
  const [toggle, setToggle] = useState(true);

  const handleSwitch = (event) => {
    setToggle(!toggle);
  };
  return (
    <Grid container alignItems="center" direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5">{name}</Typography>
      </Grid>
      <Grid item container justifyContent="center" alignItems="center">
        <Grid item>
          <ViewList />
        </Grid>
        <Grid item>
          <Switch checked={toggle} onChange={handleSwitch} />
        </Grid>
        <Grid item>
          <Dashboard />
        </Grid>
      </Grid>
      <Grid container item justifyContent="center" xs={10}>
        {menus ? (
          toggle ? (
            <MenuCardView key={Date.now()} menus={menus} />
          ) : (
            <MenuListView menus={menus} />
          )
        ) : (
          <Grid item>No Data Available</Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default PublicMenuHomeView;
