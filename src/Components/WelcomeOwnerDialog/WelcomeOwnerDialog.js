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

export default function WelcomeOwnerDialog({ open, setOpen, menuRepository }) {
  const [loading, setLoading] = useState();
  const [ownerInfo, setOwnerInfo] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [msg, setMsg] = useState({ type: "", msg: "" });
  function handleCancel() {
    setOpen(false);
  }
  function handleSave() {
    if (
      !ownerInfo ||
      !ownerInfo.businessName ||
      !ownerInfo.ownerName ||
      !ownerInfo.phone ||
      !ownerInfo.email
    ) {
      setMsg({
        type: "error",
        msg: "Please fill in the forms for our sales team to contact you",
      });
      setSnackbarOpen(true);
      return;
    }
    setLoading(true);
    const submitId = Date.now().toString();
    menuRepository.submitOwnerForm(submitId, ownerInfo);
    setLoading(false);
    setMsg({
      type: "success",
      msg: "Your information was sent successfully. Our sales team will contact you shortly!",
    });
    setSnackbarOpen(true);
    setOpen(false);
    setOwnerInfo();
  }
  function handleClose() {
    setSnackbarOpen(false);
  }
  function handleOnChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    switch (target) {
      case "businessName":
        setOwnerInfo({
          ...ownerInfo,
          businessName: value,
        });
        return;
      case "ownerName":
        setOwnerInfo({
          ...ownerInfo,
          ownerName: value,
        });
        return;
      case "phone":
        setOwnerInfo({
          ...ownerInfo,
          phone: value,
        });
        return;
      case "email":
        setOwnerInfo({
          ...ownerInfo,
          email: value,
        });
        return;
      case "addressLine1":
        setOwnerInfo({
          ...ownerInfo,
          address: { ...ownerInfo.address, addressLine1: value },
        });
        return;
      case "addressLine2":
        setOwnerInfo({
          ...ownerInfo,
          address: { ...ownerInfo.address, addressLine2: value },
        });
        return;
      case "city":
        setOwnerInfo({
          ...ownerInfo,
          address: { ...ownerInfo.address, city: value },
        });
        return;
      case "state":
        setOwnerInfo({
          ...ownerInfo,
          address: { ...ownerInfo.address, state: value },
        });
        return;
      case "zipCode":
        setOwnerInfo({
          ...ownerInfo,
          address: { ...ownerInfo.address, zipCode: value },
        });
        return;

      default:
        return;
    }
  }
  return (
    <Box>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Restaurant Owner</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Contact our sales team by submitting this information
          </DialogContentText>
          <Grid sx={{ mt: 1 }} container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography>Business Name</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                variant="outlined"
                label="Business Name"
                name="businessName"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Owner Full Name</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="Owner Full Name"
                name="ownerName"
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
              <Typography>Location</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={loading}
                fullWidth
                variant="outlined"
                label="Address Line1"
                name="addressLine1"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={loading}
                fullWidth
                variant="outlined"
                label="Address Line2"
                name="addressLine2"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={loading}
                fullWidth
                variant="outlined"
                label="City"
                name="city"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={loading}
                fullWidth
                variant="outlined"
                label="State"
                name="state"
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={loading}
                fullWidth
                variant="outlined"
                label="ZIP Code"
                name="zipCode"
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
