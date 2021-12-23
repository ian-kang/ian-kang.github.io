import { Google } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Login({ authService }) {
  const navigate = useNavigate();

  authService
    .getRedirectResult()
    .then((result) => {
      console.log("result", result);
    })
    .catch((error) => {
      console.log("error", error);
    });

  const handleOnClick = () => {
    authService.login();
  };
  return (
    <Dialog open>
      <DialogTitle sx={{ textAlign: "center" }}>Log in</DialogTitle>
      <List>
        <ListItem>
          <ListItemButton onClick={handleOnClick}>
            <ListItemIcon>
              <Google />
            </ListItemIcon>
            <ListItemText>Sign in with Google</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}
export default Login;
