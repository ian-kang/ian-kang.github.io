import React, { useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";

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
  const handleInputOnChange = (event) => {
    const targetInput = event.target.name;
    const value = event.target.value;
    const updated = { ...newMenu, [targetInput]: value };
    setNewMenu(updated);
  };
  const handleAddButtonOnClick = () => {
    addMenu(customerId, newMenu);
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
