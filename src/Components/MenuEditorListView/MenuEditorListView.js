import { Divider, Grid, Box, Typography } from "@mui/material";
import React from "react";
import CategoryEditCard from "../CategoryEditForm/CategoryEditForm";
import MenuCard from "../MenuCard/MenuCard";
import MenuEditForm from "../MenuEditForm/MenuEditForm";
import MenuAddCard from "../MenuAddCard/MenuAddCard";

function MenuEditorListView({
  data,
  cloudinary,
  customerId,
  updateMenu,
  deleteMenu,
  addMenu,
  editCategory,
}) {
  const menusArray = Object.values(data.menus);
  const categories = [...new Set(menusArray.map((menu) => menu.category))];
  return (
    <>
      {categories.map((category) => (
        <Box>
          <Box sx={{ mt: 4 }}>
            <Divider />
          </Box>
          <Box>
            <Grid container spacing={4} sx={{ mt: 1 }}>
              <Grid
                item
                container
                xs={12}
                md={6}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h6">{category}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <CategoryEditCard
                  customerId={customerId}
                  category={category}
                  editCategory={editCategory}
                />
              </Grid>

              {menusArray
                .filter((menu) => menu.category === category)
                .map((menu) => (
                  <Grid container item xs={12} alignItems="center" spacing={4}>
                    <Grid item xs={12} md={6}>
                      <MenuCard menu={menu} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MenuEditForm
                        cloudinary={cloudinary}
                        customerId={customerId}
                        menu={menu}
                        menus={data.menus}
                        menusArray={menusArray}
                        categories={categories}
                        updateMenu={updateMenu}
                        deleteMenu={deleteMenu}
                      />
                    </Grid>
                  </Grid>
                ))}
              <Grid item xs={12} md={6}>
                <MenuAddCard
                  cloudinary={cloudinary}
                  customerId={customerId}
                  category={category}
                  addMenu={addMenu}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default MenuEditorListView;
