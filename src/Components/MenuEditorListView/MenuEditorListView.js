import { Delete, Edit, Save } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
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
      <Grid item xs={12}>
        <TextField
          disabled
          required
          label="Category"
          name="category"
          value={category}
          // onChange={handleInputOnChange}
          fullWidth
        />
      </Grid>

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
