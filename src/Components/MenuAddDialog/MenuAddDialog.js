import { PhotoCamera, Save } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

export default function MenuAddDialog({
  open,
  setOpen,
  category,
  customerId,
  imageRepository,
  addMenu,
  menus,
}) {
  const [menuOnEdit, setMenuOnEdit] = useState({
    name: "",
    rate: "none",
    price: "",
    priceB: "",
    img: "",
    desc: "",
    pairs: [],
  });
  const [menusOnEdit, setMenusOnEdit] = useState(menus);
  const [loading, setLoading] = useState(false);
  const [imageFileOnEdit, setImageFileOnAdd] = useState();

  useEffect(() => {
    setMenusOnEdit(menus);
  }, [menus]);

  function handleOnChange(event) {
    const targetInput = event.target.name;
    if (targetInput === "img") {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageFileOnAdd(file);
        setMenuOnEdit({ ...menuOnEdit, [targetInput]: url });
      }
      setImageFileOnAdd("");
      return;
    }
    const value = event.target.value;
    setMenuOnEdit({ ...menuOnEdit, [targetInput]: value });
  }
  function handleCancel() {
    setOpen(false);
  }
  async function handleSave() {
    setLoading(true);
    if (imageFileOnEdit) {
      const result = await imageRepository.imageUpload(
        customerId,
        imageFileOnEdit,
        [menuOnEdit.menuId, category, menuOnEdit.name]
      );
      const menuId = Date.now().toString();
      setMenuOnEdit({ ...menuOnEdit, img: result.url, menuId });
      let newMenus;
      if (menusOnEdit.categories[category].menuOrder) {
        newMenus = {
          ...menusOnEdit,
          categories: {
            ...menusOnEdit.categories,
            [category]: {
              ...menusOnEdit.categories[category],
              menuOrder: [
                ...menusOnEdit.categories[category].menuOrder,
                menuId,
              ],
            },
          },
          items: {
            ...menusOnEdit.items,
            [menuId]: { ...menuOnEdit, menuId },
          },
        };
      } else {
        newMenus = {
          ...menusOnEdit,
          categories: {
            ...menusOnEdit.categories,
            [category]: {
              ...menusOnEdit.categories[category],
              menuOrder: [menuId],
            },
          },
          items: {
            ...menusOnEdit.items,
            [menuId]: { ...menuOnEdit, menuId },
          },
        };
      }

      setMenusOnEdit(newMenus);
      addMenu(newMenus);
      setMenuOnEdit({
        name: "",
        rate: "none",
        price: "",
        priceB: "",
        desc: "",
        img: "",
        pairs: [],
      });
      setImageFileOnAdd();
      setLoading(false);
      setOpen(false);
      return;
    }
    const menuId = Date.now().toString();
    setMenuOnEdit({ ...menuOnEdit, menuId });
    let newMenus;
    if (menusOnEdit.categories[category].menuOrder) {
      newMenus = {
        ...menusOnEdit,
        categories: {
          ...menusOnEdit.categories,
          [category]: {
            ...menusOnEdit.categories[category],
            menuOrder: [...menusOnEdit.categories[category].menuOrder, menuId],
          },
        },
        items: {
          ...menusOnEdit.items,
          [menuId]: { ...menuOnEdit, menuId },
        },
      };
    } else {
      newMenus = {
        ...menusOnEdit,
        categories: {
          ...menusOnEdit.categories,
          [category]: {
            ...menusOnEdit.categories[category],
            menuOrder: [menuId],
          },
        },
        items: {
          ...menusOnEdit.items,
          [menuId]: { ...menuOnEdit, menuId },
        },
      };
    }
    setMenusOnEdit(newMenus);
    addMenu(newMenus);
    setMenuOnEdit({
      name: "",
      rate: "none",
      price: "",
      priceB: "",
      desc: "",
      img: "",
      pairs: [],
    });
    setLoading(false);
    setOpen(false);
  }
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Add New Menu</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Grid sx={{ mt: 1 }} container item spacing={2}>
          <Grid item xs={5}>
            <TextField
              required
              label="Menu name"
              name="name"
              value={menuOnEdit.name}
              onChange={handleOnChange}
              fullWidth
              disabled={loading}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              label="Rate"
              name="rate"
              value={menuOnEdit.rate}
              defaultValue="none"
              onChange={handleOnChange}
              fullWidth
              disabled={loading}
            >
              <MenuItem key="None" value="none">
                None
              </MenuItem>
              <MenuItem key="High" value="high">
                High
              </MenuItem>
              <MenuItem key="Mid" value="mid">
                Mid
              </MenuItem>
              <MenuItem key="Low" value="low">
                Low
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              label="Price"
              name="price"
              value={menuOnEdit.price}
              onChange={handleOnChange}
              disabled={loading}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              type="number"
              label="Price(B)"
              name="priceB"
              value={menuOnEdit.priceB}
              onChange={handleOnChange}
              disabled={loading}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          {menuOnEdit.img && (
            <Grid
              container
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <img
                  src={menuOnEdit.img}
                  alt=""
                  loading="lazy"
                  style={{ width: "100%", height: "100%" }}
                />
              </Grid>
            </Grid>
          )}

          <Grid container item xs={12} justifyContent="right">
            <Grid item>
              <label htmlFor={`contained-button-file-${category}`}>
                <Input
                  sx={{ display: "none" }}
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  id={`contained-button-file-${category}`}
                  name="img"
                  onChange={handleOnChange}
                  disabled={loading}
                />
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                  disabled={loading}
                >
                  Image Upload
                </Button>
              </label>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="desc"
              value={menuOnEdit.desc}
              onChange={handleOnChange}
              fullWidth
              multiline
              disabled={loading}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>
        <LoadingButton
          loading={loading}
          onClick={handleSave}
          startIcon={<Save />}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
