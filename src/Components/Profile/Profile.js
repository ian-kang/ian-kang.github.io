import { Add } from "@mui/icons-material";
import { Button, Grid, Input, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Profile({ user }) {
  const [loading, setLoading] = useState();
  const handleInputOnChange = () => {};
  return (
    <Grid container xs={12} justifyContent="center">
      <Grid item>
        <Typography variant="h5">Profile</Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Grid
          container
          item
          direction="column"
          justifyContent="space-around"
          spacing={2}
          sx={{ p: 4, maxWidth: "400px" }}
        >
          <Grid item>
            <Typography>Business Name</Typography>
          </Grid>
          <Grid item>
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              label="Business Name"
              name="businessName"
            />
          </Grid>
          <Grid item>
            <Typography>Business Description (Bio)</Typography>
          </Grid>
          <Grid item>
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              label="Business Description (Bio)"
              name="businessDesc"
            />
          </Grid>
          <Grid item>
            <Typography>Location</Typography>
          </Grid>
          <Grid item>
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              label="Address Line1"
              name="addressLine1"
            />
          </Grid>
          <Grid item>
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              label="Address Line2"
              name="addressLine2"
            />
          </Grid>
          <Grid item>
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              label="City"
              name="city"
            />
          </Grid>
          <Grid item>
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              label="State"
              name="state"
            />
          </Grid>
          <Grid item>
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              label="ZIP Code"
              name="zipCode"
            />
          </Grid>
          <Grid item>
            <Typography>Phone</Typography>
          </Grid>
          <Grid item>
            <TextField
              autoFocus
              fullWidth
              variant="outlined"
              label="Phone"
              name="phone"
            />
          </Grid>
          <Grid item>
            <Typography>Logo</Typography>
          </Grid>
          <Grid item>
            <label htmlFor={`contained-button-file-logo`}>
              <Input
                sx={{ display: "none" }}
                type="file"
                inputProps={{ accept: "image/*" }}
                id={`contained-button-file-logo`}
                name="img"
                onChange={handleInputOnChange}
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
          <Grid item>
            <Typography>Business Hours</Typography>
          </Grid>
          <Grid item>business hours settings</Grid>
          <Grid item>
            <Typography>Email</Typography>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
            />
          </Grid>
          <Grid item>
            <Typography>Password</Typography>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              name="password"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
