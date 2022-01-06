import { Divider, Grid, Box, Typography } from "@mui/material";
import React from "react";
import CategoryEditCard from "../CategoryEditForm/CategoryEditForm";
import MenuEditForm from "../MenuEditForm/MenuEditForm";
import MenuAddCard from "../MenuAddCard/MenuAddCard";
import PairedMenuCard from "../PairedMenuCard/PairedMenuCard";

function MenuEditorListView({
  data,
  imageRepository,
  menuRepository,
  customerId,
  updateMenu,
  deleteMenu,
  saved,
  editCategory,
}) {
  return (
    <>
      {data.menus.categoryOrder.map((category) => (
        <Box key={category}>
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
                  key={category}
                  customerId={customerId}
                  category={category}
                  editCategory={editCategory}
                />
              </Grid>

              {data.menus.categories[category].menuOrder.map((menuId) => (
                <Grid
                  key={menuId}
                  container
                  item
                  alignItems="center"
                  spacing={4}
                >
                  <Grid item xs={12} md={6}>
                    <PairedMenuCard
                      menu={data.menus.items[menuId]}
                      menus={data.menus.items}
                      type="edit"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MenuEditForm
                      imageRepository={imageRepository}
                      customerId={customerId}
                      menu={data.menus.items[menuId]}
                      menuItems={data.menus.items}
                      categories={data.menus.categoryOrder}
                      updateMenu={updateMenu}
                      deleteMenu={deleteMenu}
                    />
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12} md={6}>
                <MenuAddCard
                  imageRepository={imageRepository}
                  menuRepository={menuRepository}
                  customerId={customerId}
                  category={category}
                  menus={data.menus}
                  saved={saved}
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
