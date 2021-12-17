import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText, List } from "@mui/material";

import React from "react";

export default function MenuListItem({ menu }) {
  return (
    <List>
      <ListItem>
        {menu.rate === "High" ? (
          <ListItemIcon>
            <Star />
          </ListItemIcon>
        ) : menu.rate === "Mid" ? (
          <ListItemIcon>
            <StarHalf />
          </ListItemIcon>
        ) : menu.rate === "Low" ? (
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
        ) : null}

        <ListItemText primary={menu.name} secondary={menu.desc} />
        <ListItemText primary={`$${menu.price}`} />
      </ListItem>
    </List>
  );
}
