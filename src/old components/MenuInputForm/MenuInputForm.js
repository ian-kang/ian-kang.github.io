import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";

export default function MenuInputForm({
  pairedId,
  menuId,
  menu,
  updateMenu,
  deleteMenu,
}) {
  const handleChange = (event) => {
    updateMenu(pairedId, menuId, {
      ...menu,
      [event.target.name]: event.target.value,
    });
  };
  const handleDeleteButton = (event) => {
    deleteMenu(pairedId, menuId);
  };
  return (
    <Grid container item spacing={2}>
      <Grid item xs={6}>
        <TextField
          required
          label="Name"
          name="name"
          defaultValue={menu.name}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          select
          label="Rate"
          name="rate"
          value={menu.rate}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem key="None" value="None">
            None
          </MenuItem>
          <MenuItem key="High" value="High">
            High
          </MenuItem>
          <MenuItem key="Mid" value="Mid">
            Mid
          </MenuItem>
          <MenuItem key="Low" value="Low">
            Low
          </MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField
          type="number"
          label="Price"
          name="price"
          defaultValue={menu.price}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          name="desc"
          defaultValue={menu.desc}
          onChange={handleChange}
          fullWidth
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="contained" onClick={handleDeleteButton}>
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
