import React from "react";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

function MenuEditorPreviewListItem({ menu }) {
  return (
    <List>
      <ListItem>
        {menu.rate === "high" ? (
          <ListItemIcon>
            <Star />
          </ListItemIcon>
        ) : menu.rate === "mid" ? (
          <ListItemIcon>
            <StarHalf />
          </ListItemIcon>
        ) : menu.rate === "low" ? (
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

export default MenuEditorPreviewListItem;
