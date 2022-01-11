import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
} from "@mui/material";
import { Save } from "@mui/icons-material";

function CategoryEditCard({ open, setOpen, category, editCategory }) {
  const [categoryOnEdit, setCategoryOnEdit] = useState(category);
  const handleOnChange = (event) => {
    const value = event.target.value;
    setCategoryOnEdit(value);
  };
  const handleCancel = () => {
    setCategoryOnEdit(category);
    setOpen(false);
  };
  const handleSave = () => {
    editCategory(category, categoryOnEdit);
    setCategoryOnEdit(categoryOnEdit);
    setOpen(false);
  };
  return (
    <Grid container item spacing={2} alignItems="center">
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            sx={{ mt: 1 }}
            required
            autoFocus
            label="Category"
            name="category"
            value={categoryOnEdit}
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

export default CategoryEditCard;
