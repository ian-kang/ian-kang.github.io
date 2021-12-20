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
  const menusArray = Object.values(menus);
  const categories = [...new Set(menusArray.map((menu) => menu.category))];
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
              menus={menusArray}
              categories={categories}
              customerId={customerId}
              updateMenu={updateMenu}
              deleteMenu={deleteMenu}
              addMenu={addMenu}
              editCategory={editCategory}
            />
          </Grid>
          <Grid container item xs={12}>
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
