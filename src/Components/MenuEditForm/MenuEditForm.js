import React, { useState } from "react";
import { Grid } from "@mui/material";
import MenuEditCard from "../MenuEditCard/MenuEditCard";
import MenuEditDialog from "../MenuEditDialog/MenuEditDialog";

function MenuEditForm({
  imageRepository,
  menuRepository,
  customerId,
  menu,
  menuItems,
  updateMenu,
  deleteMenu,
}) {
  const [open, setOpen] = useState(false);

  const handleEdit = (event) => {
    setOpen(true);
  };
  const handleDelete = (event) => {
    deleteMenu(customerId, menuItems, menu.menuId);
  };
  return (
    <Grid container item spacing={2}>
      <MenuEditCard
        menu={menu}
        menuItems={menuItems}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <MenuEditDialog
        open={open}
        setOpen={setOpen}
        menu={menu}
        menuItems={menuItems}
        imageRepository={imageRepository}
        menuRepository={menuRepository}
        updateMenu={updateMenu}
        customerId={customerId}
      />
    </Grid>
  );
}

export default MenuEditForm;
