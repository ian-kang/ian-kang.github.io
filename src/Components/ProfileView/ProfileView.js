import { Add, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Input,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeleteAlertDialog from "../DeleteAlertDialog/DeleteAlertDialog";

export default function ProfileView({
  user,
  customerId,
  menuRepository,
  imageRepository,
  authService,
}) {
  const [customerInfo, setCustomerInfo] = useState();
  const [customerInfoOnEdit, setCustomerInfoOnEdit] = useState();
  const [imageFileOnEdit, setImageFileOnEdit] = useState();
  const [loading, setLoading] = useState();
  const [disabled, setDisabled] = useState(true);
  const [noCustomerInfo, setNoCustomerInfo] = useState();
  const [updatePasswordOpen, setUpdatePasswordOpen] = useState(false);
  const [updatePassword, setUpdatePassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [alertMsg, setAlertMsg] = useState({ type: "", msg: "" });
  const [snackbarMsg, setSnackbarMsg] = useState({ type: "", msg: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    menuRepository.getCustomerInfo(customerId, (data) => {
      if (data) {
        setCustomerInfo(data);
        setCustomerInfoOnEdit(data);
        setLoading(false);
        return;
      }
      setNoCustomerInfo(true);
      setLoading(false);
    });
  }, [menuRepository, customerId]);

  const handleLogoOnChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDisabled(true);
      const url = URL.createObjectURL(file);
      setImageFileOnEdit(url);
      setCustomerInfoOnEdit({ ...customerInfoOnEdit, logo: file });
      setDisabled(false);
      return;
    }
    setCustomerInfoOnEdit({ ...customerInfoOnEdit, logo: "" });
  };
  const handleSaveButtonOnClick = async () => {
    setLoading(true);
    if (customerInfoOnEdit.logo) {
      const result = await imageRepository.logoImageUpload(
        customerId,
        customerInfoOnEdit.logo
      );
      menuRepository.updateCustomerInfo(customerId, {
        ...customerInfoOnEdit,
        logo: result.secure_url,
      });
      setCustomerInfoOnEdit();
      setLoading(false);
      setDisabled(true);
      setSnackbarOpen(true);
      setSnackbarMsg({
        type: "success",
        msg: "Saved!",
      });
      window.location.reload();
      return;
    }
    menuRepository.updateCustomerInfo(customerId, customerInfoOnEdit);
    setCustomerInfoOnEdit();
    setLoading(false);
    setDisabled(true);
    setSnackbarOpen(true);
    setSnackbarMsg({
      type: "success",
      msg: "Saved!",
    });
    window.location.reload();
  };
  const handleUpdatePasswordOnClick = () => {
    setUpdatePasswordOpen(true);
  };
  const handleCancelOnUpdatePassword = () => {
    setUpdatePassword({
      newPassword: "",
      confirmNewPassword: "",
    });
    setAlertMsg({ type: "", msg: "" });
    setUpdatePasswordOpen(false);
  };
  const handleSaveOnUpdatePassword = () => {
    if (updatePassword.newPassword !== updatePassword.confirmNewPassword) {
      setAlertMsg({
        type: "error",
        msg: "The new passwords you entered do not match",
      });
    } else {
      setAlertMsg({ type: "", msg: "" });
      authService
        .updatePassword(updatePassword.newPassword)
        .then(() => {
          setUpdatePasswordOpen(false);
          setSnackbarOpen(true);
          setSnackbarMsg({
            type: "success",
            msg: "New password is updated successfully!",
          });
          setUpdatePassword({
            newPassword: "",
            confirmNewPassword: "",
          });
        })
        .catch((error) => {
          if (error.code === "auth/requires-recent-login") {
            setAlertMsg({
              type: "error",
              msg: "Please try to login again!",
            });
            return;
          } else if (error.code === "auth/weak-password") {
            setAlertMsg({
              type: "error",
              msg: "Password should be at least 6 characters",
            });
            return;
          }
          console.log(error);
        });
    }
  };
  const handleOnChangeUpdatePassword = (event) => {
    const target = event.target.name;
    const value = event.target.value;
    switch (target) {
      case "newPassword":
        setUpdatePassword({ ...updatePassword, newPassword: value });
        return;
      case "confirmNewPassword":
        setUpdatePassword({ ...updatePassword, confirmNewPassword: value });
        return;
      default:
        return;
    }
  };
  const handleOnChange = (event) => {
    setDisabled(false);
    const target = event.target.name;
    const value = event.target.value;
    switch (target) {
      case "businessName":
        const publicUrl = value.replace(/\s/g, "-").toLowerCase();
        setCustomerInfoOnEdit({
          ...customerInfoOnEdit,
          name: value,
          publicUrl,
        });
        return;
      case "businessDesc":
        setCustomerInfoOnEdit({ ...customerInfoOnEdit, desc: value });
        return;
      case "addressLine1":
        setCustomerInfoOnEdit({
          ...customerInfoOnEdit,
          address: { ...customerInfoOnEdit.address, addressLine1: value },
        });
        return;
      case "addressLine2":
        setCustomerInfoOnEdit({
          ...customerInfoOnEdit,
          address: { ...customerInfoOnEdit.address, addressLine2: value },
        });
        return;
      case "city":
        setCustomerInfoOnEdit({
          ...customerInfoOnEdit,
          address: { ...customerInfoOnEdit.address, city: value },
        });
        return;
      case "state":
        setCustomerInfoOnEdit({
          ...customerInfoOnEdit,
          address: { ...customerInfoOnEdit.address, state: value },
        });
        return;
      case "zipCode":
        setCustomerInfoOnEdit({
          ...customerInfoOnEdit,
          address: { ...customerInfoOnEdit.address, zipCode: value },
        });
        return;
      case "phone":
        setCustomerInfoOnEdit({
          ...customerInfoOnEdit,
          phone: value,
        });
        return;
      case "logo":
        setCustomerInfoOnEdit({
          ...customerInfoOnEdit,
          logo: value,
        });
        return;
      case "website":
        setCustomerInfoOnEdit({
          ...customerInfoOnEdit,
          website: value,
        });
        return;
      default:
        return;
    }
  };
  const handleDeleteAccountOnClick = () => {
    setDeleteAccountOpen(true);
  };
  const deleteAccount = () => {
    authService
      .deleteUser()
      .then(() => {})
      .catch(console.log);
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sx={{ textAlign: "center" }}>
        <Typography variant="h5">Profile</Typography>
      </Grid>
      {!loading && customerInfo && (
        <Grid container item spacing={2} sx={{ p: 4, maxWidth: "800px" }}>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              Business Name (*English only)
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={loading}
              fullWidth
              variant="outlined"
              label="Business Name"
              name="businessName"
              onChange={handleOnChange}
              defaultValue={customerInfo.name}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>
              Business Description (Bio)
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={loading}
              fullWidth
              variant="outlined"
              label="Business Description (Bio)"
              name="businessDesc"
              onChange={handleOnChange}
              defaultValue={customerInfo.desc}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>Location</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={loading}
              fullWidth
              variant="outlined"
              label="Address Line1"
              name="addressLine1"
              onChange={handleOnChange}
              defaultValue={
                customerInfo.address && customerInfo.address.addressLine1
              }
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
              defaultValue={
                customerInfo.address && customerInfo.address.addressLine2
              }
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
              defaultValue={customerInfo.address && customerInfo.address.city}
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
              defaultValue={customerInfo.address && customerInfo.address.state}
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
              defaultValue={
                customerInfo.address && customerInfo.address.zipCode
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Phone</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={loading}
              fullWidth
              type="tel"
              variant="outlined"
              label="Phone"
              name="phone"
              onChange={handleOnChange}
              defaultValue={customerInfo.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>Logo</Typography>
          </Grid>
          {(imageFileOnEdit || customerInfo.logo) && (
            <Grid container item xs={12} alignItems="center">
              <Grid item>
                <img
                  src={imageFileOnEdit || customerInfo.logo}
                  alt=""
                  loading="lazy"
                  style={{ width: "200px", borderRadius: 4 }}
                />
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <label htmlFor={`contained-button-file-logo`}>
              <Input
                sx={{ display: "none" }}
                type="file"
                inputProps={{ accept: "image/*" }}
                id={`contained-button-file-logo`}
                name="img"
                onChange={handleLogoOnChange}
                disabled={loading}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<Add />}
                disabled={loading}
              >
                Upload Logo
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>Business Hours</Typography>
          </Grid>
          <Grid item xs={12}>
            business hours settings
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>Website</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="url"
              variant="outlined"
              label="Website"
              name="website"
              onChange={handleOnChange}
              disabled={loading}
              defaultValue={customerInfo.website}
            />
          </Grid>

          {user && (
            <>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  fullWidth
                  variant="outlined"
                  type="email"
                  label="Email"
                  name="email"
                  defaultValue={user.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: "bold" }}>Password</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="span"
                  disabled={loading}
                  onClick={handleUpdatePasswordOnClick}
                >
                  Update Password
                </Button>
              </Grid>
              <Dialog
                open={updatePasswordOpen}
                onClose={handleCancelOnUpdatePassword}
              >
                <DialogTitle>Update Password</DialogTitle>
                <DialogContent>
                  <DialogContentText></DialogContentText>
                  {alertMsg.type && (
                    <Grid item>
                      <Alert severity={alertMsg.type}>{alertMsg.msg}</Alert>
                    </Grid>
                  )}
                  <TextField
                    sx={{ mt: 1 }}
                    required
                    type="password"
                    label="New Password"
                    name="newPassword"
                    value={updatePassword.newPassword}
                    fullWidth
                    onChange={handleOnChangeUpdatePassword}
                  />
                  <TextField
                    sx={{ mt: 1 }}
                    required
                    type="password"
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    value={updatePassword.confirmNewPassword}
                    fullWidth
                    onChange={handleOnChangeUpdatePassword}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCancelOnUpdatePassword}>Cancel</Button>
                  <Button
                    onClick={handleSaveOnUpdatePassword}
                    startIcon={<Save />}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Delete Account
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="span"
                  color="error"
                  disabled={loading}
                  onClick={handleDeleteAccountOnClick}
                >
                  Delete Account
                </Button>
              </Grid>
              <DeleteAlertDialog
                open={deleteAccountOpen}
                setDeleteAlertOpen={setDeleteAccountOpen}
                deleteFn={deleteAccount}
                text="Are you sure you want to delete this account? the account won't be able to restored permanently."
              />
            </>
          )}

          <Grid item xs={12}>
            <LoadingButton
              disabled={disabled}
              loading={loading}
              fullWidth
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveButtonOnClick}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      )}
      {noCustomerInfo && (
        <Grid item sx={{ p: 4 }}>
          This page will be available after your first menu is created. please
          follow this link to create your first menu (
          <Link to="/editor">Menu Editor</Link>)
        </Grid>
      )}
      {snackbarMsg.type && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => {
            setSnackbarOpen(false);
          }}
        >
          <Alert severity={snackbarMsg.type}>{snackbarMsg.msg}</Alert>
        </Snackbar>
      )}
    </Grid>
  );
}
