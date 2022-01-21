import { Delete } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export default function DeleteAlertDialog({
  open,
  setDeleteAlertOpen,
  deleteFn,
  text,
}) {
  function handleClose() {
    setDeleteAlertOpen(false);
  }
  function handleDelete() {
    deleteFn();
    setDeleteAlertOpen(false);
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<Delete />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
