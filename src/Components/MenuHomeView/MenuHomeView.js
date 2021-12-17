import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import database from "../../Repository/database";
import PairedMenuCard from "../PairedMenuCard/PairedMenuCard";
import MenuCategoryTabBar from "../MenuCategoryTabBar/MenuCategoryTabBar";
import NavBar from "../NavBar/NavBar";

function MenuHomeView() {
  const [category, setCategory] = useState();
  const handleTabChange = (event, newCategory) => {
    setCategory(newCategory);
  };
  return (
    <Box>
      <NavBar
        logo={database["restaurant1"]["logoImg"]}
        name={database["restaurant1"].name}
      />
      <Grid container item justifyContent="center">
        <Grid item>
          <Typography variant="h5">Your Menu</Typography>
        </Grid>
      </Grid>
      <MenuCategoryTabBar
        data={database["restaurant1"]}
        category={category}
        handleTabChange={handleTabChange}
      />

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
            Object.keys(database["restaurant1"].menus[category]).map(
              (menuId) => (
                <Grid item xs={12} md={6} lg={4} xl={3}>
                  <PairedMenuCard
                    menu={database["restaurant1"].menus[category][menuId]}
                  />
                </Grid>
              )
            )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default MenuHomeView;
