import { Grid, Typography } from "@mui/material";
import React from "react";
import CategoryAddForm from "../CategoryAddForm/CategoryAddForm";
import MenuEditorListView from "../MenuEditorListView/MenuEditorListView";

function MenuEditorHomeView({
  menus,
  customerId,
  updateMenu,
  deleteMenu,
  addMenu,
  editCategory,
  addCategory,
}) {
  const categories = [...new Set(menus.map((menu) => menu.category))];
  return (
    <Grid container>
      <Grid container item justifyContent="center">
        <Grid item>
          <Typography variant="h5">Menu Editor</Typography>
        </Grid>
      </Grid>
      <Grid container item justifyContent="center">
        <Grid container item xs={10} spacing={4}>
          <Grid container item xs={12}>
            <MenuEditorListView
              menus={menus}
              categories={categories}
              customerId={customerId}
              updateMenu={updateMenu}
              deleteMenu={deleteMenu}
              addMenu={addMenu}
              editCategory={editCategory}
            />
          </Grid>
          <Grid>
            <CategoryAddForm
              customerId={customerId}
              addCategory={addCategory}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MenuEditorHomeView;
