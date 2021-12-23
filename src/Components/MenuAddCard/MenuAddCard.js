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

function MenuAddCard({ cloudinary, customerId, category, addMenu }) {
  const [newMenu, setNewMenu] = useState({
    menuId: Date.now(),
    category,
    name: "",
    rate: "none",
    price: "",
    desc: "",
    img: "",
    pairs: [],
  });
  const [imageFileOnEdit, setImageFileOnAdd] = useState();

  useEffect(() => {
    setNewMenu({ ...newMenu, category });
  }, [category]);

  const handleInputOnChange = (event) => {
    const targetInput = event.target.name;
    if (targetInput === "img") {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageFileOnAdd(file);
      setNewMenu({ ...newMenu, category, [targetInput]: url });
      return;
    }
    const value = event.target.value;
    setNewMenu({ ...newMenu, category, [targetInput]: value });
  };
  const handleAddButtonOnClick = async () => {
    if (imageFileOnEdit) {
      const result = await cloudinary.imageUpload(imageFileOnEdit, [
        newMenu.menuId,
        newMenu.category,
        newMenu.name,
      ]);
      addMenu(customerId, { ...newMenu, img: result.url }, newMenu.menuId);
      setNewMenu({
        menuId: Date.now(),
        category,
        name: "",
        rate: "none",
        price: "",
        desc: "",
        img: "",
        pairs: [],
      });
      setImageFileOnAdd();
      return;
    }
    addMenu(customerId, newMenu, newMenu.menuId);
    setNewMenu({
      menuId: Date.now(),
      category,
      name: "",
      rate: "none",
      price: "",
      desc: "",
      img: "",
      pairs: [],
    });
  };

  return (
    <div>
      <Grid container item spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            label="Menu name"
            name="name"
            value={newMenu.name}
            onChange={handleInputOnChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            label="Rate"
            name="rate"
            value={newMenu.rate}
            onChange={handleInputOnChange}
            fullWidth
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
        <Grid item xs={3}>
          <TextField
            type="number"
            label="Price"
            name="price"
            value={newMenu.price}
            onChange={handleInputOnChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        {newMenu.img && (
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <img
                src={newMenu.img}
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
                accept="image/*"
                id={`contained-button-file-${category}`}
                name="img"
                onChange={handleInputOnChange}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<PhotoCamera />}
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
            value={newMenu.desc}
            onChange={handleInputOnChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddButtonOnClick}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default MenuAddCard;
