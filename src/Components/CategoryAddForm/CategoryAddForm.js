import { Add } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

function CategoryAddForm({ customerId, addCategory }) {
  const [category, setCategory] = useState("");
  const handleOnChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };
  const handleAddButtonOnClick = () => {
    addCategory(customerId, category);
  };

  return (
    <Grid container item xs={6} spacing={2} alignItems="center">
      <Grid item xs={9}>
        <TextField
          required
          label="Category"
          name="category"
          value={category}
          onChange={handleOnChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddButtonOnClick}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
}

export default CategoryAddForm;
