import { RestaurantMenu, WineBar } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";

export default function MenuTitle({ type, name }) {
  return (
    <List>
      <ListItem>
        {type === "Food" ? (
          <ListItemIcon>
            <RestaurantMenu />
          </ListItemIcon>
        ) : type === "Wine" ? (
          <ListItemIcon>
            <WineBar />
          </ListItemIcon>
        ) : null}

        <ListItemText primary={name} />
      </ListItem>
      <Divider variant="middle" />
    </List>
  );
}
