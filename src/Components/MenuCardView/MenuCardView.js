import { Grid } from "@mui/material";
import React, { useState } from "react";
import PairedMenuCard from "../PairedMenuCard/PairedMenuCard";
import MenuCategoryTabBar from "../MenuCategoryTabBar/MenuCategoryTabBar";
import { Box } from "@mui/system";

function MenuCardView({ menus }) {
  const [category, setCategory] = useState(menus.categoryOrder[0]);

  const handleTabChange = (event, newCategory) => {
    setCategory(newCategory);
  };
  return (
    <Grid container item justifyContent="center" xs={10}>
      <Grid item xs={12} sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MenuCategoryTabBar
            category={category}
            categories={menus.categoryOrder}
            handleTabChange={handleTabChange}
          />
        </Box>
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
            menus.categories[category].menuOrder.map((menuId) => (
              <Grid key={menuId} item xs={12} md={6} lg={4} xl={3}>
                <PairedMenuCard
                  key={menuId}
                  menu={menus.items[menuId]}
                  menus={menus.items}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MenuCardView;
