import { LoadingButton } from "@mui/lab";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function ForgotPassword({ authService, setForgotPassword }) {
  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const handleOnChange = (event) => {
    setEmail(event.target.value);
  };
  const handleOnClick = () => {
    setLoading(true);
    authService
      .sendPasswordResetEmail(email)
      .then(() => {
        setMsg({
          type: "success",
          msg: "We just sent you an updated password reset link. If you don't see it in your inbox, remember to check your spam folder.",
        });
        setLoading(false);
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setMsg({ type: "error", msg: "User is not found" });
          setLoading(false);
          return;
        }
        setMsg(error.message);
        setLoading(false);
      });
  };
  return (
    <Grid container justifyContent="center">
      <Grid
        container
        item
        direction="column"
        justifyContent="space-around"
        spacing={2}
        sx={{ p: 4, maxWidth: "400px" }}
      >
        <Grid item container justifyContent="center">
          <Grid item>
            <Typography variant="h5">Reset Password</Typography>
          </Grid>
        </Grid>
        {msg ? (
          <Grid item>
            <Alert severity={msg.type}>{msg.msg}</Alert>
          </Grid>
        ) : (
          <Grid item>
            <Typography variant="subtitle2">
              Enter the email address you used to register with Pairable and
              we'll send you instructions to reset your password.
            </Typography>
          </Grid>
        )}

        <Grid item>
          <TextField
            autoFocus
            fullWidth
            type="email"
            variant="outlined"
            label="Email"
            name="email"
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item container justifyContent="center">
          <Grid item xs={12}>
            <LoadingButton
              loading={loading}
              fullWidth
              variant="contained"
              size="large"
              onClick={handleOnClick}
            >
              Send Instruction
            </LoadingButton>
          </Grid>
        </Grid>
        <Grid item container justifyContent="center">
          <Grid item>
            <Button
              onClick={() => {
                setForgotPassword(false);
              }}
            >
              Back to login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
