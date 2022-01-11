import { Save } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

function CategoryAddForm({ open, setOpen, addCategory }) {
  const [category, setCategory] = useState("New Category");
  const handleOnChange = (event) => {
    const value = event.target.value;
    setCategory(value);
  };
  const handleSave = () => {
    addCategory(category);
    setOpen(false);
    setCategory("");
  };
  const handleCancel = () => {
    setOpen(false);
    setCategory("");
  };

  return (
    <Grid container item spacing={2} alignItems="center">
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            sx={{ mt: 1 }}
            required
            autoFocus
            label="Category"
            name="category"
            value={category}
            fullWidth
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave} startIcon={<Save />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default CategoryAddForm;
