import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Input,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { Add, PhotoCamera } from "@mui/icons-material";

function MenuInputAddForm({ buttonName, customerId, category, addMenu }) {
  const [newMenu, setNewMenu] = useState({
    menuId: Date.now(),
    category,
    name: "",
    rate: "none",
    price: "",
    desc: "",
    img: "",
  });

  useEffect(() => {
    setNewMenu({ ...newMenu, category });
  }, [category]);

  const [imageFileOnEdit, setImageFileOnEdit] = useState("");
  const handleInputOnChange = (event) => {
    const targetInput = event.target.name;
    const value = event.target.value;
    const updated = { ...newMenu, category, [targetInput]: value };
    setNewMenu(updated);
  };
  const handleAddButtonOnClick = () => {
    addMenu(customerId, newMenu, newMenu.menuId);
    setNewMenu({
      menuId: Date.now(),
      category,
      name: "",
      rate: "none",
      price: "",
      desc: "",
      img: "",
    });
  };
  const handleFileInputOnChange = (event) => {
    const file = event.target.files[0];
    setImageFileOnEdit(file);
    const updated = { ...newMenu, img: file };
    setNewMenu(updated);
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
        {imageFileOnEdit && (
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <ImageList cols={1}>
                <ImageListItem>
                  <img src={imageFileOnEdit} alt="No Iamge" loading="lazy" />
                </ImageListItem>
              </ImageList>
            </Grid>
          </Grid>
        )}

        <Grid container item xs={12} justifyContent="right">
          <Grid item>
            <label htmlFor="contained-button-file">
              <Input
                sx={{ display: "none" }}
                type="file"
                accept="image/*"
                id="contained-button-file"
                onChange={handleFileInputOnChange}
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
            disabled
            label="Category"
            name="category"
            value={newMenu.category}
            fullWidth
          />
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
            {buttonName}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default MenuInputAddForm;
