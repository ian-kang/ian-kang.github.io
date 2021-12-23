import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Home({ navBar, authService, user }) {
  const [result, setResult] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    authService.onAuthChange((user) => {
      // user && navigate("/menu", { state: user });
    });
  });

  const handleOnClick = () => {
    authService.login();
  };
  return (
    <Box>
      {navBar}
      {result}
      <Grid container justifyContent="center">
        <Grid item>
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
        </Grid>
      </Grid>
    </Box>
  );
}
export default Home;
