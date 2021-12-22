import {
  List,
  ListItemText,
  ListItemButton,
  ListItem,
  Stack,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function NavBarToggleList({ logo, name }) {
  const navigate = useNavigate();
  const handleOnClick = (event, index) => {
    switch (index) {
      case 0:
        navigate("/menu");
        return;
      case 1:
        navigate("/editor");
        return;
      default:
        return;
    }
  };
  return (
    <List sx={{ width: "250px" }}>
      <ListItem>
        <Stack direction="row" spacing={2} alignItems="center">
          <Paper variant="outlined">
            <img
              src={logo}
              alt="No Iamge"
              loading="lazy"
              style={{ width: "50px", height: "50px" }}
            />
          </Paper>
          <Typography sx={{ mt: 2, mb: 2 }} variant="h7" component="div">
            {name}
          </Typography>
        </Stack>
      </ListItem>
      <ListItemButton divider onClick={(event) => handleOnClick(event, 0)}>
        <ListItemText>Your Menu</ListItemText>
      </ListItemButton>

      <ListItemButton divider onClick={(event) => handleOnClick(event, 1)}>
        <ListItemText>Menu Editor</ListItemText>
      </ListItemButton>
    </List>
  );
}

export default NavBarToggleList;
