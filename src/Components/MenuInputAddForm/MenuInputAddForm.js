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
  const [menu, setMenu] = useState({
    name: "",
    rate: "none",
    price: "",
    desc: "",
  });
  const handleInputOnChange = (event) => {
    const targetInput = event.target.name;
    const value = event.target.value;
    const updated = { ...menu, [targetInput]: value };
    setMenu(updated);
  };
  const handleAddButtonOnClick = () => {
    addMenu(customerId, category, menu);
    setMenu({
      name: "",
      rate: "none",
      price: "",
      desc: "",
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
            value={menu.name}
            onChange={handleInputOnChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            label="Rate"
            name="rate"
            value={menu.rate}
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
            value={menu.price}
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
            value={menu.desc}
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
