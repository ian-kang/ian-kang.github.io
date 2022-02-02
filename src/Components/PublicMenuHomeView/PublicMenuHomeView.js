import { Dashboard, ViewList } from "@mui/icons-material";
import { Box, Grid, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PublicMenuCardView from "../PublicMenuCardView/PublicMenuCardView";
import PublicMenuListView from "../PublicMenuListView/PublicMenuListView";

function PublicMenuHomeView({ menuRepository, customerId, customer }) {
  const [toggle, setToggle] = useState(false);

  const handleSwitch = (event) => {
    setToggle(!toggle);
  };
  return (
    <Box sx={{ mt: 4, mb: 8, overflow: "hidden" }}>
      <Grid container alignItems="center" direction="column" spacing={4}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {customer.logo && (
            <Grid item>
              <img
                src={customer.logo}
                alt=""
                loading="lazy"
                style={{ width: "80px", height: "80px", borderRadius: 4 }}
              />
            </Grid>
          )}

          <Grid item sx={{ textAlign: "center" }}>
            <Typography variant="h4">{customer.name}</Typography>
          </Grid>
        </Grid>
        {customer.address && (
          <Grid item sx={{ textAlign: "center" }}>
            <Typography variant="subtitle1">
              {customer.address.addressLine1 &&
                `${customer.address.addressLine1}, `}
              {customer.address.addressLine2 &&
                `${customer.address.addressLine2}, `}
              {customer.address.city && `${customer.address.city}, `}
              {customer.address.state && `${customer.address.state} `}
              {customer.address.zipCode && `${customer.address.zipCode}`}
            </Typography>
          </Grid>
        )}

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
          {customer.menus ? (
            toggle ? (
              <PublicMenuCardView
                key={Date.now()}
                menus={customer.menus}
                menuRepository={menuRepository}
                customerId={customerId}
              />
            ) : (
              <PublicMenuListView
                menus={customer.menus}
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
