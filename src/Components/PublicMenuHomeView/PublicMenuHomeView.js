import { Dashboard, ViewList } from "@mui/icons-material";
import { Box, Grid, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import PublicMenuCardView from "../PublicMenuCardView/PublicMenuCardView";
import PublicMenuListView from "../PublicMenuListView/PublicMenuListView";

function PublicMenuHomeView({ menuRepository, customerId, menus, logo, name }) {
  const [toggle, setToggle] = useState(true);

  const handleSwitch = (event) => {
    setToggle(!toggle);
  };
  return (
    <Box sx={{ mt: 4, mb: 8 }}>
      <Grid container alignItems="center" direction="column" spacing={4}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {logo && (
            <Grid item>
              <img
                src={logo}
                alt=""
                loading="lazy"
                style={{ width: "80px", height: "80px", borderRadius: 4 }}
              />
            </Grid>
          )}

          <Grid item>
            <Typography variant="h4">{name}</Typography>
          </Grid>
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
              <PublicMenuCardView
                key={Date.now()}
                menus={menus}
                menuRepository={menuRepository}
                customerId={customerId}
              />
            ) : (
              <PublicMenuListView
                menus={menus}
                menuRepository={menuRepository}
                customerId={customerId}
              />
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
