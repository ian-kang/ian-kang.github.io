import React, { useState } from "react";
import { Grid } from "@mui/material";
import MenuEditCard from "../MenuEditCard/MenuEditCard";
import MenuEditDialog from "../MenuEditDialog/MenuEditDialog";
import { CircleLoader } from "react-spinners";

function MenuEditForm({
  imageRepository,
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
  const [loading, setLoading] = useState();

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
      setLoading(true);
      const result = await imageRepository.imageUpload(imageFileOnEdit, [
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
      setLoading(false);
      return;
    }
    updateMenu(customerId, menu.menuId, { ...menuOnEdit, img: imageUrlOnEdit });
    setMenuOnEdit(menuOnEdit);
    setOpen(false);
  };
  return (
    <>
      {loading ? (
        <Grid container justifyContent="center">
          <Grid item>
            <CircleLoader loading={loading} />
          </Grid>
        </Grid>
      ) : (
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
      )}
    </>
  );
}

export default MenuEditForm;
