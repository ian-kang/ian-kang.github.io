import { Grid, Typography } from "@mui/material";
import React from "react";
import CategoryMenuList from "../CategoryMenuList/CategoryMenuList";

export default function MenuListView({ menus }) {
  return (
    <Grid
      item
      container
      justifyContent="center"
      xs={10}
      sm={8}
      md={6}
      lg={6}
      xl={4}
    >
      {menus.categoryOrder.map((category) => (
        <Grid key={category} item container direction="column">
          <Grid item>
            <Typography variant="h5">{category}</Typography>
          </Grid>
          <Grid item>
            <CategoryMenuList menus={menus} category={category} />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
