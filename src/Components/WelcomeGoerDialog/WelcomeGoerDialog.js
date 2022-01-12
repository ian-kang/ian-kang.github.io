import { Send } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

export default function WelcomeGoerDialog({ open, setOpen, menuRepository }) {
  const [loading, setLoading] = useState();
  const [goerInfo, setGoerInfo] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [msg, setMsg] = useState({ type: "", msg: "" });
  function handleCancel() {
    setOpen(false);
  }
  function handleSave() {
    if (!goerInfo || !goerInfo.name || !goerInfo.phone || !goerInfo.email) {
      setMsg({
        type: "error",
        msg: "Please fill in the forms for our sales team to contact you",
      });
      setSnackbarOpen(true);
      return;
    }
    setLoading(true);
    const submitId = Date.now().toString();
    menuRepository.submitGoerForm(submitId, goerInfo);
    setLoading(false);
    setMsg({
      type: "success",
      msg: "Your information was sent successfully. Our sales team will contact you shortly!",
    });
    setSnackbarOpen(true);
    setOpen(false);
    setGoerInfo();
  }
  function handleClose() {
    setSnackbarOpen(false);
  }
  function handleOnChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    switch (target) {
      case "name":
        setGoerInfo({
          ...goerInfo,
          name: value,
        });
        return;
      case "phone":
        setGoerInfo({
          ...goerInfo,
          phone: value,
        });
        return;
      case "email":
        setGoerInfo({
          ...goerInfo,
          email: value,
        });
        return;
      case "yelp":
        setGoerInfo({
          ...goerInfo,
          yelp: value,
        });
        return;

      default:
        return;
    }
  }
  return (
    <Box>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Restaurant Go-er</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Contact our sales team by submitting this information
          </DialogContentText>
          <Grid sx={{ mt: 1 }} container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography>Full Name</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="Full Name"
                name="name"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Phone</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="tel"
                variant="outlined"
                label="Phone"
                name="phone"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Email</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="email"
                variant="outlined"
                label="Email"
                name="email"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Yelp User Link (Optional)</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={loading}
                fullWidth
                type="url"
                variant="outlined"
                label="Yelp User Link"
                name="yelp"
                onChange={handleOnChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={() => {
              handleSave();
            }}
            startIcon={<Send />}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {msg.type && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={msg.type}
            sx={{ width: "100%" }}
          >
            {msg.msg}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}
