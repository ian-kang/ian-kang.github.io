import { Dashboard, ViewList } from "@mui/icons-material";
import { Box, Grid, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import MenuCardView from "../MenuCardView/MenuCardView";
import MenuListView from "../MenuListView/MenuListView";

function PublicMenuHomeView({ menuRepository, customerId, menus, logo, name }) {
  const [toggle, setToggle] = useState(true);

  const handleSwitch = (event) => {
    setToggle(!toggle);
  };
  return (
    <Box sx={{ mt: 4, mb: 8 }}>
      <Grid container alignItems="center" direction="column" spacing={4}>
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
              <MenuCardView
                key={Date.now()}
                menus={menus}
                menuRepository={menuRepository}
                customerId={customerId}
              />
            ) : (
              <MenuListView menus={menus} />
            )
          ) : (
            <Grid item>No Data Available</Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default PublicMenuHomeView;
