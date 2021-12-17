import React, { useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";

function MenuInputEditForm({
  customerId,
  menu,
  menuId,
  updateMenu,
  deleteMenu,
  category,
}) {
  const [disabled, setDisabled] = useState({
    name: true,
    rate: true,
    price: true,
    desc: true,
  });
  const [menuOnChange, setMenuOnChange] = useState(menu);

  const handleInputOnChange = (event) => {
    const targetInput = event.target.name;
    const value = event.target.value;
    const updatedMenu = { ...menuOnChange };
    updatedMenu[targetInput] = value;
    setMenuOnChange(updatedMenu);
  };
  const handleEditButtonOnClick = (event) => {
    setDisabled({
      name: false,
      rate: false,
      price: false,
      desc: false,
    });
  };
  const handleSaveButtonOnClick = (event) => {
    updateMenu(customerId, category, menuId, menuOnChange);
    setMenuOnChange(menu);
    setDisabled({
      name: true,
      rate: true,
      price: true,
      desc: true,
    });
  };
  const handleDeleteButtonOnClick = (event) => {
    deleteMenu(customerId, category, menuId);
  };
  return (
    <Grid container item spacing={2}>
      <Grid item xs={6}>
        <TextField
          disabled={disabled.name}
          required
          label="Name"
          name="name"
          value={menuOnChange.name}
          onChange={handleInputOnChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          disabled={disabled.rate}
          select
          label="Rate"
          name="rate"
          value={menuOnChange.rate}
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
          disabled={disabled.price}
          type="number"
          label="Price"
          name="price"
          value={menuOnChange.price}
          onChange={handleInputOnChange}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled={disabled.desc}
          label="Description"
          name="desc"
          value={menuOnChange.desc}
          onChange={handleInputOnChange}
          fullWidth
          multiline
        />
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={6}>
          {disabled.name ? (
            <Button
              fullWidth
              variant="contained"
              startIcon={<Edit />}
              onClick={handleEditButtonOnClick}
            >
              Edit
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveButtonOnClick}
            >
              Save
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Delete />}
            onClick={handleDeleteButtonOnClick}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MenuInputEditForm;
