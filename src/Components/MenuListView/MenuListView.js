import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import PairedMenuCard from "../PairedMenuCard/PairedMenuCard";
import MenuCategoryTabBar from "../MenuCategoryTabBar/MenuCategoryTabBar";

function MenuListView({ data }) {
  const [category, setCategory] = useState();

  const menusArray = Object.values(data.menus);
  const categories = [...new Set(menusArray.map((menu) => menu.category))];

  const handleTabChange = (event, newCategory) => {
    setCategory(newCategory);
  };
  return (
    <Grid container>
      <Grid container item justifyContent="center">
        <Grid item>
          <Typography variant="h5">Your Menu</Typography>
        </Grid>
      </Grid>

      <Grid container item justifyContent="center">
        <Grid sx={{ mb: 4 }}>
          <MenuCategoryTabBar
            category={category}
            categories={categories}
            handleTabChange={handleTabChange}
          />
        </Grid>

        <Grid container justifyContent="center">
          <Grid
            item
            container
            xs={10}
            spacing={2}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {category &&
              menusArray
                .filter((menu) => menu.category === category)
                .map((menu) => (
                  <Grid item xs={12} md={6} lg={4} xl={3}>
                    <PairedMenuCard menu={menu} menus={data.menus} />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MenuListView;
