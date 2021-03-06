import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

function SignInView({ authService, setForgotPassword, setSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const handleOnChange = (event) => {
    const target = event.target.name;
    const value = event.target.value;
    switch (target) {
      case "email":
        setEmail(value);
        return;
      case "password":
        setPassword(value);
        return;
      default:
        return;
    }
  };
  const handleOnKeyPress = (event) => {
    if (event.key === "Enter") {
      handleOnClick();
      return;
    }
  };
  const handleOnClick = () => {
    authService
      .signInWithEmailPassword(email, password)
      .then()
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError("email");
          setErrorMsg("User is not found");
        } else if (error.code === "auth/wrong-password") {
          setError("password");
          setErrorMsg("Incorrect password");
        } else if (error.code === "auth/too-many-requests") {
          setError("tooManyRequest");
          setErrorMsg(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
          );
        } else {
          console.log(error);
        }
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
        {errorMsg && (
          <Grid item>
            <Alert severity="error">{errorMsg}</Alert>
          </Grid>
        )}

        <Grid item>
          <Typography>Email</Typography>
        </Grid>
        <Grid item>
          <TextField
            error={error === "email" && true}
            helperText={error === "email" && "Incorrect entry"}
            autoFocus
            fullWidth
            type="email"
            variant="outlined"
            label="Email"
            name="email"
            onChange={handleOnChange}
            onKeyPress={handleOnKeyPress}
          />
        </Grid>
        <Grid item>
          <Typography>Password</Typography>
        </Grid>
        <Grid item>
          <TextField
            error={error === "password" && true}
            helperText={error === "password" && "Incorrect entry"}
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            onChange={handleOnChange}
            onKeyPress={handleOnKeyPress}
          />
        </Grid>
        <Grid item container justifyContent="space-around">
          <Grid item>
            <Button
              onClick={() => {
                setForgotPassword(true);
              }}
            >
              Forgot password?
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                setSignUp(true);
              }}
            >
              Don't have an account? Sign up
            </Button>
          </Grid>
        </Grid>
        <Grid item container justifyContent="center">
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleOnClick}
            >
              Log in
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default SignInView;
