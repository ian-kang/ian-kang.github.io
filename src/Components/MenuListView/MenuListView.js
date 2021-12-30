import { Grid, Typography } from "@mui/material";
import React from "react";
import CategoryMenuList from "../CategoryMenuList/CategoryMenuList";

export default function MenuListView({ menus }) {
  const menusArray = Object.values(menus);
  const categories = [...new Set(menusArray.map((menu) => menu.category))];
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
      {categories.map((category) => (
        <Grid key={category} item container direction="column">
          <Grid item>
            <Typography variant="h5">{category}</Typography>
          </Grid>
          <Grid item>
            <CategoryMenuList
              menus={menus}
              menusArray={menusArray}
              category={category}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
