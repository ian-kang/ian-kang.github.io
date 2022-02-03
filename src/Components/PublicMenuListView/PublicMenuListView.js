import { Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import PublicCategoryMenuList from "../PublicCategoryMenuList/PublicCategoryMenuList";
import PublicMenuCategoryTabBarForListView from "../PublicMenuCategoryTabBarForListView/PublicMenuCategoryTabBarForListView";

export default function PublicMenuListView({
  menus,
  menuRepository,
  customerId,
}) {
  const [category, setCategory] = useState(menus.categoryOrder[0]);
  const categoryRef = useRef({});

  const handleTabChange = (event, newCategory) => {
    categoryRef.current[newCategory].scrollIntoView({
      behavior: "smooth",
    });
    setCategory(newCategory);
  };

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
      <PublicMenuCategoryTabBarForListView
        category={category}
        categories={menus.categoryOrder}
        handleTabChange={handleTabChange}
      />
      {menus.categoryOrder.map((category) => (
        <Grid
          key={category}
          ref={(el) =>
            (categoryRef.current = { ...categoryRef.current, [category]: el })
          }
          item
          container
          direction="column"
        >
          <Grid item sx={{ mt: 8 }}>
            <Typography variant="h5">{category}</Typography>
          </Grid>
          <Grid item>
            <PublicCategoryMenuList
              menus={menus}
              category={category}
              menuRepository={menuRepository}
              customerId={customerId}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
