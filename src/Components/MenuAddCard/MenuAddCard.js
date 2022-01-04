import React, { useState } from "react";
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

function MenuAddCard({ imageRepository, customerId, category, addMenu }) {
  const [newMenu, setNewMenu] = useState({
    menuId: Date.now(),
    category,
    name: "",
    rate: "none",
    price: "",
    priceB: "",
    desc: "",
    img: "",
    pairs: [],
  });
  const [imageFileOnEdit, setImageFileOnAdd] = useState();
  const [loading, setLoading] = useState(false);

  const handleInputOnChange = (event) => {
    const targetInput = event.target.name;
    if (targetInput === "img") {
      const file = event.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageFileOnAdd(file);
        setNewMenu({ ...newMenu, category, [targetInput]: url });
        return;
      }
      setImageFileOnAdd("");
    }
    const value = event.target.value;
    setNewMenu({ ...newMenu, category, [targetInput]: value });
  };
  const handleAddButtonOnClick = async () => {
    if (imageFileOnEdit) {
      setLoading(true);
      const result = await imageRepository.imageUpload(
        customerId,
        imageFileOnEdit,
        [newMenu.menuId, newMenu.category, newMenu.name]
      );
      addMenu(customerId, { ...newMenu, img: result.url }, newMenu.menuId);
      setNewMenu({
        menuId: Date.now(),
        category,
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
      return;
    }
    setLoading(true);
    addMenu(customerId, newMenu, newMenu.menuId);
    setNewMenu({
      menuId: Date.now(),
      category,
      name: "",
      rate: "none",
      price: "",
      priceB: "",
      desc: "",
      img: "",
      pairs: [],
    });
    setLoading(false);
  };

  return (
    <div>
      <Grid container item spacing={2}>
        <Grid item xs={5}>
          <TextField
            required
            label="Menu name"
            name="name"
            value={newMenu.name}
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
            value={newMenu.rate}
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
            value={newMenu.price}
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
            value={newMenu.priceB}
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
            value={newMenu.desc}
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
