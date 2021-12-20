import { Add } from "@mui/icons-material";
import { Button, Divider, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

function CategoryAddForm({ customerId, addCategory }) {
  const [category, setCategory] = useState("New Category");
  const handleOnChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };
  const handleAddButtonOnClick = () => {
    addCategory(customerId, category);
    setCategory("");
  };

  return (
    <Grid container item xs={6} spacing={2} alignItems="center">
      <Divider />
      <Grid item xs={9}>
        <TextField
          required
          label="New category"
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
