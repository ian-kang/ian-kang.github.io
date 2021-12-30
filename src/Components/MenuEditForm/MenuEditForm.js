import React, { useState } from "react";
import { Grid } from "@mui/material";
import MenuEditCard from "../MenuEditCard/MenuEditCard";
import MenuEditDialog from "../MenuEditDialog/MenuEditDialog";

function MenuEditForm({
  imageRepository,
  customerId,
  menu,
  menus,
  menusArray,
  updateMenu,
  deleteMenu,
}) {
  const [open, setOpen] = useState(false);

  const handleEdit = (event) => {
    setOpen(true);
  };
  const handleDelete = (event) => {
    deleteMenu(customerId, menu.menuId);
  };
  return (
    <Grid container item spacing={2}>
      <MenuEditCard
        menu={menu}
        menus={menus}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <MenuEditDialog
        open={open}
        setOpen={setOpen}
        menu={menu}
        menus={menus}
        menusArray={menusArray}
        imageRepository={imageRepository}
        updateMenu={updateMenu}
        customerId={customerId}
      />
    </Grid>
  );
}

export default MenuEditForm;
