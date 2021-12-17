import { Delete } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import MenuInputAddForm from "../MenuInputAddForm/MenuInputAddForm";
import MenuInputEditForm from "../MenuInputEditForm/MenuInputEditForm";

function MenuEditorListView({
  menus,
  updateMenu,
  customerId,
  category,
  deleteMenu,
  addMenu,
}) {
  return (
    <Grid container spacing={4}>
      {Object.keys(menus).map((menuId) => (
        <Grid item>
          <MenuInputEditForm
            customerId={customerId}
            menu={menus[menuId]}
            menuId={menuId}
            updateMenu={updateMenu}
            deleteMenu={deleteMenu}
            category={category}
          />
        </Grid>
      ))}
      <Grid item>
        <MenuInputAddForm
          buttonName="Add"
          customerId={customerId}
          category={category}
          addMenu={addMenu}
        />
      </Grid>
    </Grid>
  );
}

export default MenuEditorListView;
