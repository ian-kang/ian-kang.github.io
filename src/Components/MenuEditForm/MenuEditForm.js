import React, { useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Delete, Edit, PhotoCamera, Save } from "@mui/icons-material";
import { Box } from "@mui/system";
import MenuEditCard from "../MenuEditCard/MenuEditCard";
import MenuEditDialog from "../MenuEditDialog/MenuEditDialog";

function MenuEditForm({
  cloudinary,
  customerId,
  menu,
  menus,
  menusArray,
  updateMenu,
  deleteMenu,
}) {
  const [open, setOpen] = useState();
  const [menuOnEdit, setMenuOnEdit] = useState(menu);
  const [imageUrlOnEdit, setImageUrlOnEdit] = useState(menu.img);
  const [imageFileOnEdit, setImageFileOnEdit] = useState();

  const handleEdit = (event) => {
    setOpen(true);
  };
  const handleDelete = (event) => {
    deleteMenu(customerId, menu.menuId);
  };
  const handleImageDeleteButton = () => {
    setImageUrlOnEdit("");
  };

  const handleOnChange = (event) => {
    if (event.target.name === "img") {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageUrlOnEdit(url);
      setImageFileOnEdit(file);
      return;
    } else if (event.target.name === "pairs") {
      const value = event.target.value;
      const pairs = typeof value === "string" ? value.split(",") : value;
      setMenuOnEdit({ ...menuOnEdit, pairs });
      return;
    }
    const target = event.target.name;
    const value = event.target.value;
    setMenuOnEdit({ ...menuOnEdit, [target]: value });
  };
  const handleCancel = () => {
    setOpen(false);
    setMenuOnEdit(menu);
    setImageUrlOnEdit(menu.img);
    setImageFileOnEdit();
  };
  const handleSave = async () => {
    if (imageFileOnEdit) {
      const result = await cloudinary.imageUpload(imageFileOnEdit, [
        menuOnEdit.menuId,
        menuOnEdit.category,
        menuOnEdit.name,
      ]);
      updateMenu(customerId, menu.menuId, {
        ...menuOnEdit,
        img: result.url,
      });
      setMenuOnEdit(menu);
      setOpen(false);
      return;
    }
    updateMenu(customerId, menu.menuId, { ...menuOnEdit, img: imageUrlOnEdit });
    setMenuOnEdit(menuOnEdit);
    setOpen(false);
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
        menuOnEdit={menuOnEdit}
        handleCancel={handleCancel}
        handleOnChange={handleOnChange}
        imageUrlOnEdit={imageUrlOnEdit}
        handleImageDeleteButton={handleImageDeleteButton}
        handleSave={handleSave}
        menus={menus}
        menusArray={menusArray}
      />
    </Grid>
  );
}

export default MenuEditForm;
