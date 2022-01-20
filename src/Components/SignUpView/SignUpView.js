import { LoadingButton } from "@mui/lab";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function SignUpView({ authService, menuRepository, setSignUp }) {
  const [email, setEmail] = useState();
  const [confirmEmail, setConfirmEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  function handleOnChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    switch (target) {
      case "email":
        setEmail(value);
        return;
      case "confirmEmail":
        setConfirmEmail(value);
        return;
      case "password":
        setPassword(value);
        return;
      default:
        return;
    }
  }
  function handleSignUp() {
    setLoading(true);
    if (email !== confirmEmail) {
      setMsg({
        type: "error",
        msg: "The email address you entered do not match",
      });
      setLoading(false);
      return;
    }
    authService
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        menuRepository.addCustomerInfo(uid, {
          name: "My Business",
          publicUrl: uid,
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setMsg({
            type: "error",
            msg: "The email is already in use",
          });
          setLoading(false);
        } else {
          setMsg({
            type: "error",
            msg: error.message,
          });
          setLoading(false);
        }
      });
  }
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
            <Typography variant="h5">Sign Up</Typography>
          </Grid>
        </Grid>
        {msg.type && (
          <Grid item>
            <Alert severity={msg.type}>{msg.msg}</Alert>
          </Grid>
        )}

        <Grid item>
          <Typography>Enter your email</Typography>
        </Grid>
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
        <Grid item>
          <Typography>Confirm your email</Typography>
        </Grid>
        <Grid item>
          <TextField
            error={
              msg.msg === "The email address you entered do not match" && true
            }
            helperText={
              msg.msg === "The email address you entered do not match" &&
              "Incorrect entry"
            }
            autoFocus
            fullWidth
            type="email"
            variant="outlined"
            label="Confirm Email"
            name="confirmEmail"
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item>
          <Typography>Create a password</Typography>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
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
              onClick={handleSignUp}
            >
              Sign Up
            </LoadingButton>
          </Grid>
        </Grid>
        <Grid item container justifyContent="center">
          <Grid item>
            <Button
              onClick={() => {
                setSignUp(false);
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
