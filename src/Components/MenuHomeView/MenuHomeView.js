import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import database from "../../Repository/database";
import PairedMenuCard from "../PairedMenuCard/PairedMenuCard";
import MenuCategoryTabBar from "../MenuCategoryTabBar/MenuCategoryTabBar";
import NavBar from "../NavBar/NavBar";

function MenuHomeView() {
  const customerId = "restaurant1";
  const categories = [
    ...new Set(database[customerId].menus.map((menu) => menu.category)),
  ];
  const menus = database[customerId].menus;
  const [category, setCategory] = useState();
  const handleTabChange = (event, newCategory) => {
    setCategory(newCategory);
  };

  return (
    <Box>
      <NavBar
        // logo={database[customerId]["logoImg"]}
        name={database[customerId].name}
      />
      <Grid container item justifyContent="center">
        <Grid item>
          <Typography variant="h5">Your Menu</Typography>
        </Grid>
      </Grid>
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
            menus
              .filter((menu) => menu.category === category)
              .map((menu) => (
                <Grid item xs={12} md={6} lg={4} xl={3}>
                  <PairedMenuCard menu={menu} />
                </Grid>
              ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default MenuHomeView;
