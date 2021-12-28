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
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

function Login({ authService }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

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