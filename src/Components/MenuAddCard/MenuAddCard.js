import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Input,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { Add, PhotoCamera } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

function MenuAddCard({
  imageRepository,
  menuRepository,
  customerId,
  category,
  menus,
  saved,
}) {
  const [menuOnEdit, setMenuOnEdit] = useState({
    menuId: Date.now(),
    name: "",
    rate: "none",
    price: "",
    priceB: "",
    desc: "",
    img: "",
    pairs: [],
  });
  const [menusOnEdit, setMenusOnEdit] = useState(menus);
  const [loading, setLoading] = useState(false);
  const [imageFileOnEdit, setImageFileOnAdd] = useState();

  useEffect(() => {
    setMenusOnEdit(menus);
  }, [menus]);

  const handleInputOnChange = (event) => {
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
  };
  const handleAddButtonOnClick = async () => {
    setLoading(true);
    if (imageFileOnEdit) {
      const result = await imageRepository.imageUpload(
        customerId,
        imageFileOnEdit,
        [menuOnEdit.menuId, menuOnEdit.category, menuOnEdit.name]
      );
      const menuId = Date.now().toString();
      setMenuOnEdit({ ...menuOnEdit, img: result.secure_url, menuId });
      const newMenus = {
        ...menusOnEdit,
        categories: {
          ...menusOnEdit.categories,
          [category]: {
            menuOrder: [...menusOnEdit.categories[category].menuOrder, menuId],
          },
        },
        items: {
          ...menusOnEdit.items,
          [menuId]: menuOnEdit,
        },
      };
      setMenusOnEdit(newMenus);
      menuRepository.updateMenus(customerId, newMenus);
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
      saved();
      return;
    }
    const menuId = Date.now().toString();
    setMenuOnEdit({ ...menuOnEdit, menuId });
    const newMenus = {
      ...menusOnEdit,
      categories: {
        ...menusOnEdit.categories,
        [category]: {
          menuOrder: [...menusOnEdit.categories[category].menuOrder, menuId],
        },
      },
      items: {
        ...menusOnEdit.items,
        [menuId]: menuOnEdit,
      },
    };
    setMenusOnEdit(newMenus);
    menuRepository.updateMenus(customerId, newMenus);
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
    saved();
  };

  return (
    <div>
      <Grid container item spacing={2}>
        <Grid item xs={5}>
          <TextField
            required
            label="Menu name"
            name="name"
            value={menuOnEdit.name}
            onChange={handleInputOnChange}
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
            onChange={handleInputOnChange}
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
            onChange={handleInputOnChange}
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
            onChange={handleInputOnChange}
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
                onChange={handleInputOnChange}
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
            onChange={handleInputOnChange}
            fullWidth
            multiline
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loading={loading}
            fullWidth
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddButtonOnClick}
          >
            Add
          </LoadingButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default MenuAddCard;
