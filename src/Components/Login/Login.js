import { Google } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUser(user);
        navigate("/menu");
      } else {
        setUser(undefined);
        console.log("user is signed out");
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
    authService.signInWithEmailPassword(email, password);
  };
  return (
    <Dialog open maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>Log in</DialogTitle>
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
            <Typography>Email</Typography>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
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
              fullWidth
              variant="outlined"
              label="Password"
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
