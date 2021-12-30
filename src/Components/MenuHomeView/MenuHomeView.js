import { Dashboard, ViewList } from "@mui/icons-material";
import { Grid, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuCardView from "../MenuCardView/MenuCardView";
import MenuListView from "../MenuListView/MenuListView";

function MenuHomeView({ customerId, menuRepository }) {
  const [database, setDatabase] = useState({});
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    menuRepository.getMenus(customerId, (data) => {
      if (data) {
        setDatabase(data);
        return;
      }
    });
  }, [customerId, menuRepository]);

  const handleSwitch = (event) => {
    setToggle(!toggle);
  };

  return (
    <Grid container item alignItems="center" direction="column" spacing={4}>
      <Grid item>
        <Typography variant="h5">Your Menu</Typography>
      </Grid>
      <Grid item>
        <Link to={`/menu/${database.publicUrl}`}>Public Menu URL</Link>
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
        {Object.keys(database).find((key) => key === "menus") ? (
          toggle ? (
            <MenuCardView key={Date.now()} menus={database.menus} />
          ) : (
            <MenuListView menus={database.menus} />
          )
        ) : (
          <Grid item>No Data Available</Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default MenuHomeView;
