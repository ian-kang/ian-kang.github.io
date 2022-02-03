import { Grid } from "@mui/material";
import React, { useState } from "react";
import MenuCategoryTabBar from "../MenuCategoryTabBar/MenuCategoryTabBar";
import PairedMenuCard from "../PairedMenuCard/PairedMenuCard";

function MenuCardView({ menus }) {
  const [category, setCategory] = useState(menus.categoryOrder[0]);

  const handleTabChange = (event, newCategory) => {
    setCategory(newCategory);
  };
  return (
    <Grid container item justifyContent="center" xs={10}>
      <MenuCategoryTabBar
        category={category}
        categories={menus.categoryOrder}
        handleTabChange={handleTabChange}
      />

      <Grid container justifyContent="center" sx={{ mt: 4 }}>
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
                <PairedMenuCard
                  key={menuId}
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

export default MenuCardView;
