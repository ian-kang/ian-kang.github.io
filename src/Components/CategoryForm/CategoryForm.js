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
import { Edit, Save } from "@mui/icons-material";

function CategoryForm({ customerId, category, editCategory }) {
  const [open, setOpen] = useState();
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
    editCategory(customerId, category, categoryOnEdit);
    setOpen(false);
  };
  const handleEditButtonOnClick = () => {
    setOpen(true);
  };
  return (
    <Grid container item spacing={2} alignItems="center">
      <Grid item xs={9}>
        <TextField
          disabled
          required
          label="Category"
          name="category"
          value={category}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Edit />}
          onClick={handleEditButtonOnClick}
        >
          Edit
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Edit</DialogTitle>
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

export default CategoryForm;
