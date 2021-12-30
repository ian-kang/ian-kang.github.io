import { Add, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function ProfileView({
  user,
  customerId,
  menuRepository,
  imageRepository,
}) {
  const [customerInfo, setCustomerInfo] = useState();
  const [customerInfoOnEdit, setCustomerInfoOnEdit] = useState();
  const [imageFileOnEdit, setImageFileOnEdit] = useState();
  const [loading, setLoading] = useState();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setLoading(true);
    menuRepository.getMenus(customerId, (data) => {
      if (data) {
        setCustomerInfo(data);
        setLoading(false);
        return;
      }
      setLoading(false);
    });
  }, [menuRepository, customerId]);

  const handleLogoOnChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageFileOnEdit(url);
      setCustomerInfoOnEdit({ ...customerInfoOnEdit, logo: file });
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
        logo: result.url,
      });
      setCustomerInfoOnEdit();
      setLoading(false);
      setDisabled(true);
      return;
    }
    menuRepository.updateCustomerInfo(customerId, customerInfoOnEdit);
    setCustomerInfoOnEdit();
    setLoading(false);
    setDisabled(true);
  };
  console.log(customerInfoOnEdit);
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
  return (
    <>
      {customerInfo && (
        <Grid container justifyContent="center">
          <Grid item xs={10} sx={{ textAlign: "center" }}>
            <Typography variant="h5">Profile</Typography>
          </Grid>
          <Grid container item spacing={2} sx={{ p: 4, maxWidth: "800px" }}>
            <Grid item xs={12}>
              <Typography>Business Name</Typography>
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
              <Typography>Business Description (Bio)</Typography>
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
                defaultValue={
                  customerInfo.address && customerInfo.address.state
                }
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
              <Typography>Logo</Typography>
            </Grid>
            {(imageFileOnEdit || customerInfo.logo) && (
              <Grid
                container
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <img
                    src={imageFileOnEdit || customerInfo.logo}
                    alt=""
                    loading="lazy"
                    style={{ width: "100%", height: "100%" }}
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
              <Typography>Business Hours</Typography>
            </Grid>
            <Grid item xs={12}>
              business hours settings
            </Grid>
            <Grid item xs={12}>
              <Typography>Website</Typography>
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
                  <Typography>Email</Typography>
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
                  <Typography>Password</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled
                    fullWidth
                    variant="outlined"
                    label="Password"
                    type="password"
                    name="password"
                  />
                </Grid>
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
        </Grid>
      )}
    </>
  );
}
