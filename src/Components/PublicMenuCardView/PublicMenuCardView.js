import { Grid } from "@mui/material";
import React, { useState } from "react";
import MenuCategoryTabBar from "../MenuCategoryTabBar/MenuCategoryTabBar";
import { Box } from "@mui/system";
import PublicPairedMenuCard from "../PublicPairedMenuCard/PublicPairedMenuCard";

function PublicMenuCardView({ menus, menuRepository, customerId }) {
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
            menus.categories[category].menuOrder &&
            menus.categories[category].menuOrder.map((menuId) => (
              <Grid key={menuId} item xs={12} md={6} lg={4} xl={3}>
                <PublicPairedMenuCard
                  menuRepository={menuRepository}
                  customerId={customerId}
                  key={menuId}
                  menuId={menuId}
                  menu={menus.items[menuId]}
                  menus={menus.items}
                  type="menu"
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PublicMenuCardView;
