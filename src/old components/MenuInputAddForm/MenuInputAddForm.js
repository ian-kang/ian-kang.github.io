import { AccountCircle, RestaurantMenu } from "@mui/icons-material";
import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export default function MenuInputAddForm({ pairedId, addMenu }) {
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const handleAddButton = () => {
    addMenu(pairedId, { name, rate, price, desc });
    setDesc("");
    setName("");
    setPrice("");
    setRate("");
  };

  return (
    <Grid container item spacing={2}>
      <Grid item xs={6}>
        <TextField
          required
          label="Name"
          name="name"
          value={name}
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          select
          label="Rate"
          name="rate"
          fullWidth
          value={rate}
          onChange={(e) => setRate(e.target.value)}
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
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          name="desc"
          fullWidth
          multiline
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="contained" onClick={handleAddButton}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
}
