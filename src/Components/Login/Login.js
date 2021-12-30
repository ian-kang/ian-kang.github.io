import {
  Alert,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

function Login({ authService }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUser(user);
        navigate("/menu");
      } else {
        setUser(undefined);
      }
    });
  }, [user, setUser, authService, navigate]);
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
    <Dialog open maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}
      >
        Log in
      </DialogTitle>
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
            />
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
    </Dialog>
  );
}
export default Login;
